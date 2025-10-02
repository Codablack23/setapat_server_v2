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
let ConversationsService = class ConversationsService {
    messageRepo;
    conversationRepo;
    messageAttachmentRepo;
    constructor(messageRepo, conversationRepo, messageAttachmentRepo) {
        this.messageRepo = messageRepo;
        this.conversationRepo = conversationRepo;
        this.messageAttachmentRepo = messageAttachmentRepo;
    }
    async getMessages(userId, id) {
        const conversation = await this.conversationRepo.findOne({
            where: { id, participants: { user: { id: userId } } },
        });
        if (!conversation) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('You are not allowed to view these messages'));
        }
        const messages = await this.messageRepo.find({
            where: { conversation: { id } },
            relations: { sender: true, attachments: true },
            order: { created_at: 'ASC' },
            take: 100,
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
                    user: { id: user.id },
                },
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation could not be found');
        }
        if (conversation.status === lib_1.ConversationStatus.CLOSED) {
            throw new common_1.ForbiddenException("Sorry you can't send message to a closed conversation");
        }
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
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map