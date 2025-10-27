"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsModule = void 0;
const common_1 = require("@nestjs/common");
const conversations_service_1 = require("./conversations.service");
const conversations_controller_1 = require("./conversations.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entity_conversations_1 = require("../entities/entity.conversations");
const entity_participants_1 = require("../entities/entity.participants");
const entity_messages_1 = require("../entities/entity.messages");
const entity_message_attachment_1 = require("../entities/entity.message_attachment");
const socket_module_1 = require("../socket/socket.module");
const socket_gateway_1 = require("../socket/socket.gateway");
let ConversationsModule = class ConversationsModule {
};
exports.ConversationsModule = ConversationsModule;
exports.ConversationsModule = ConversationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entity_conversations_1.ConversationEntity,
                entity_participants_1.ConversationParticipantEntity,
                entity_messages_1.MessageEntity,
                entity_message_attachment_1.MessageAttachmentEntity,
                entity_participants_1.ConversationParticipantEntity,
            ]),
            socket_module_1.SocketModule,
        ],
        controllers: [conversations_controller_1.ConversationsController],
        providers: [conversations_service_1.ConversationsService, socket_gateway_1.SocketGateway],
    })
], ConversationsModule);
//# sourceMappingURL=conversations.module.js.map