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
exports.DesignerApplicationEntity = void 0;
const typeorm_1 = require("typeorm");
const lib_1 = require("../lib");
const entity_order_1 = require("./entity.order");
let DesignerApplicationEntity = class DesignerApplicationEntity {
    id;
    firstname;
    lastname;
    email;
    gender;
    phone_number;
    avatar;
    telegram_handle;
    rank;
    designer_specifications;
    resume_link;
    portfolio_link;
    working_days;
    opens_at;
    closes_at;
    orders;
    created_at;
    updated_at;
};
exports.DesignerApplicationEntity = DesignerApplicationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.Gender, nullable: true }),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "telegram_handle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignerRanks, default: lib_1.DesignerRanks.JUNIOR }),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Array)
], DesignerApplicationEntity.prototype, "designer_specifications", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "resume_link", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "portfolio_link", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Array)
], DesignerApplicationEntity.prototype, "working_days", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "opens_at", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], DesignerApplicationEntity.prototype, "closes_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_1.OrderEntity, (order) => order.user),
    __metadata("design:type", Array)
], DesignerApplicationEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DesignerApplicationEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DesignerApplicationEntity.prototype, "updated_at", void 0);
exports.DesignerApplicationEntity = DesignerApplicationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "designer_applications" })
], DesignerApplicationEntity);
//# sourceMappingURL=entity.application.js.map