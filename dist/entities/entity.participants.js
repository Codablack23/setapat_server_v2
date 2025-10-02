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
exports.ConversationParticipantEntity = void 0;
const typeorm_1 = require("typeorm");
const lib_1 = require("../lib");
const entity_user_1 = require("./entity.user");
const entity_conversations_1 = require("./entity.conversations");
let ConversationParticipantEntity = class ConversationParticipantEntity {
    id;
    status;
    user;
    active_at;
    inactive_at;
    conversation;
    created_at;
    updated_at;
};
exports.ConversationParticipantEntity = ConversationParticipantEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ConversationParticipantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.ParticipantStatus, default: lib_1.ParticipantStatus.ACTIVE }),
    __metadata("design:type", String)
], ConversationParticipantEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => entity_user_1.UserEntity, (user) => user.participants),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_user_1.UserEntity)
], ConversationParticipantEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true }),
    __metadata("design:type", Date)
], ConversationParticipantEntity.prototype, "active_at", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { nullable: true }),
    __metadata("design:type", Date)
], ConversationParticipantEntity.prototype, "inactive_at", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => entity_conversations_1.ConversationEntity, (conversation) => conversation.participants),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_conversations_1.ConversationEntity)
], ConversationParticipantEntity.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ConversationParticipantEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ConversationParticipantEntity.prototype, "updated_at", void 0);
exports.ConversationParticipantEntity = ConversationParticipantEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "conversation_participant" }),
    (0, typeorm_1.Unique)(["conversation", "user"])
], ConversationParticipantEntity);
//# sourceMappingURL=entity.participants.js.map