"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_messages_1 = require("../entities/entity.messages");
const typeorm_2 = require("typeorm");
const entity_conversations_1 = require("../entities/entity.conversations");
const entity_message_attachment_1 = require("../entities/entity.message_attachment");
const lib_1 = require("../lib");
const socket_gateway_1 = require("../socket/socket.gateway");
const entity_participants_1 = require("../entities/entity.participants");
let ConversationsService = class ConversationsService {
    messageRepo;
    conversationRepo;
    messageAttachmentRepo;
    participantRepo;
    socketGateway;
    constructor(messageRepo, conversationRepo, messageAttachmentRepo, participantRepo, socketGateway) {
        this.messageRepo = messageRepo;
        this.conversationRepo = conversationRepo;
        this.messageAttachmentRepo = messageAttachmentRepo;
        this.participantRepo = participantRepo;
        this.socketGateway = socketGateway;
    }
    async getMessages(userId, id) {
        const conversation = await this.conversationRepo.findOne({
            where: { id, participants: { user: { id: userId } } },
        });
        if (!conversation) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('You are not allowed to view these messages'));
        }
        const messagesRes = await this.messageRepo.find({
            where: { conversation: { id } },
            relations: {
                sender: true,
                attachments: true,
                order_submissions: true,
                revisions: true,
            },
            order: { created_at: 'ASC' },
            take: 100,
        });
        const messages = messagesRes.map((message) => {
            if (message.type != lib_1.MessageType.SUBMISSION)
                return message;
            let revisionsPerPage = {};
            message.revisions?.forEach((item) => {
                const pageKey = item.page.toString();
                const existing = revisionsPerPage[pageKey] || { count: 0, resize: {} };
                if (item.page_type === lib_1.SubmissionPageType.PAGE) {
                    revisionsPerPage = {
                        ...revisionsPerPage,
                        [pageKey]: {
                            ...existing,
                            count: item.revisions ?? 0,
                        },
                    };
                }
                else if (item.page_type === lib_1.SubmissionPageType.RESIZE &&
                    item.resize_page) {
                    const resizeKey = item.resize_page.toString();
                    revisionsPerPage = {
                        ...revisionsPerPage,
                        [pageKey]: {
                            ...existing,
                            resize: {
                                ...existing.resize,
                                [resizeKey]: { count: item.revisions },
                            },
                        },
                    };
                }
            });
            return {
                ...message,
                revisions: revisionsPerPage,
            };
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Messages retrieved successfully',
            data: { messages },
        });
    }
    async sendMessage(user, id, sendMessageDto) {
        const conversation = await this.conversationRepo.findOne({
            where: {
                id,
                participants: {
                    status: lib_1.ParticipantStatus.ACTIVE,
                    user: { id: (0, typeorm_2.In)([user.id]) },
                },
            },
            relations: {
                participants: {
                    user: true,
                },
                order: true,
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation could not be found');
        }
        if (conversation.status === lib_1.ConversationStatus.CLOSED) {
            throw new common_1.ForbiddenException("Sorry you can't send message to a closed conversation");
        }
        const receivers = await this.participantRepo.find({
            where: {
                conversation: {
                    id: conversation.id,
                },
            },
            relations: {
                user: true,
            },
        });
        const newMessage = this.messageRepo.create({
            content: sendMessageDto.content,
            sender: user,
            conversation,
        });
        const message = await this.messageRepo.save(newMessage);
        if (sendMessageDto.attachments?.length) {
            const attachments = sendMessageDto.attachments.map((item) => this.messageAttachmentRepo.create({
                ...item,
                message,
            }));
            await this.messageAttachmentRepo.save(attachments);
            message.type = lib_1.MessageType.ATTACHMENT;
            message.attachments = attachments;
            await this.messageRepo.save(message);
        }
        receivers.forEach((item) => {
            if (item.user.id != user.id) {
                const type = message.attachments && message.attachments.length > 0
                    ? lib_1.MessageType.ATTACHMENT
                    : lib_1.MessageType.TEXT;
                this.socketGateway.emitNewMessage(item.user.id, {
                    message: {
                        order_id: conversation.order?.id,
                        from: user.firstname + ' ' + user.lastname,
                        target: item.user.user_type,
                        content: type == lib_1.MessageType.ATTACHMENT
                            ? 'New attachment message'
                            : message.content,
                        type,
                    },
                });
            }
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'message sent successfully',
            data: { message },
        });
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_messages_1.MessageEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_conversations_1.ConversationEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entity_message_attachment_1.MessageAttachmentEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entity_participants_1.ConversationParticipantEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        socket_gateway_1.SocketGateway])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map