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
exports.ConversationEntity = void 0;
const typeorm_1 = require("typeorm");
const lib_1 = require("../lib");
const entity_messages_1 = require("./entity.messages");
const entity_order_1 = require("./entity.order");
const entity_participants_1 = require("./entity.participants");
let ConversationEntity = class ConversationEntity {
    id;
    conversation_type;
    status;
    messages;
    participants;
    closed_at;
    order;
    created_at;
    updated_at;
};
exports.ConversationEntity = ConversationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ConversationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.ConversationType, default: lib_1.ConversationType.ORDER }),
    __metadata("design:type", String)
], ConversationEntity.prototype, "conversation_type", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.ConversationStatus, default: lib_1.ConversationStatus.OPEN }),
    __metadata("design:type", String)
], ConversationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_messages_1.MessageEntity, (message) => message.conversation, { cascade: true }),
    __metadata("design:type", Array)
], ConversationEntity.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_participants_1.ConversationParticipantEntity, (participant) => participant.conversation),
    __metadata("design:type", Array)
], ConversationEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true }),
    __metadata("design:type", Date)
], ConversationEntity.prototype, "closed_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.conversations, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], ConversationEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConversationEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConversationEntity.prototype, "updated_at", void 0);
exports.ConversationEntity = ConversationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "conversations" })
], ConversationEntity);
//# sourceMappingURL=entity.conversations.js.map