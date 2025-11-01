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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lib_1 = require("../lib");
const entity_order_1 = require("./entity.order");
const entity_notification_1 = require("./entity.notification");
const entity_designer_1 = require("./entity.designer");
const entity_messages_1 = require("./entity.messages");
const entity_participants_1 = require("./entity.participants");
const entity_used_discount_1 = require("./entity.used_discount");
let UserEntity = class UserEntity {
    id;
    firstname;
    lastname;
    email;
    user_type;
    gender;
    reason;
    password;
    phone_number;
    avatar;
    telegram_handle;
    orders;
    designer;
    notifications;
    sent_messages;
    participants;
    discounts;
    async hashPassword() {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
    async hashPasswordBeforeUpdate() {
        if (this.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            this.password = await bcrypt_1.default.hash(this.password, salt);
        }
    }
    created_at;
    updated_at;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.UserType, default: lib_1.UserType.USER }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.Gender, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], UserEntity.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "telegram_handle", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_1.OrderEntity, (order) => order.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entity_designer_1.DesignerProfileEntity, (designer) => designer.user),
    __metadata("design:type", entity_designer_1.DesignerProfileEntity)
], UserEntity.prototype, "designer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_notification_1.NotificationEntity, (notification) => notification.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_messages_1.MessageEntity, (messages) => messages.sender),
    __metadata("design:type", Array)
], UserEntity.prototype, "sent_messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_participants_1.ConversationParticipantEntity, (participant) => participant.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_used_discount_1.UsedDiscountEntity, (discount) => discount.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "discounts", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPasswordBeforeUpdate", null);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updated_at", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], UserEntity);
//# sourceMappingURL=entity.user.js.map