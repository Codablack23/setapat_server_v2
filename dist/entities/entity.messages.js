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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_user_1 = require("./entity.user");
const entity_conversations_1 = require("./entity.conversations");
const entity_message_attachment_1 = require("./entity.message_attachment");
const entity_order_submissions_1 = require("./entity.order_submissions");
const lib_1 = require("../lib");
const entity_message_revisions_1 = require("./entity.message_revisions");
let MessageEntity = class MessageEntity {
    id;
    conversation;
    content;
    type;
    is_read;
    is_delivered;
    sender;
    attachments;
    order_submissions;
    revisions;
    created_at;
    updated_at;
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => entity_conversations_1.ConversationEntity, (conversation) => conversation.messages),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_conversations_1.ConversationEntity)
], MessageEntity.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: lib_1.MessageType, default: lib_1.MessageType.TEXT }),
    __metadata("design:type", String)
], MessageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "is_delivered", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => entity_user_1.UserEntity, (user) => user.sent_messages),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_user_1.UserEntity)
], MessageEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_message_attachment_1.MessageAttachmentEntity, (attachment) => attachment.message),
    __metadata("design:type", Array)
], MessageEntity.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_submissions_1.OrderSubmissionEntity, (submission) => submission.message, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], MessageEntity.prototype, "order_submissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_message_revisions_1.MessageRevisionEntity, (revision) => revision.message),
    __metadata("design:type", Array)
], MessageEntity.prototype, "revisions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updated_at", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'messages' })
], MessageEntity);
//# sourceMappingURL=entity.messages.js.map