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
exports.DesignerProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const lib_1 = require("../lib");
const entity_order_assignments_1 = require("./entity.order_assignments");
const entity_user_1 = require("./entity.user");
let DesignerProfileEntity = class DesignerProfileEntity {
    id;
    role;
    level;
    rank;
    user;
    order_assignments;
    designers;
    supervisor;
    designer_specifications;
    working_days;
    resume_link;
    portfolio_link;
    opens_at;
    closes_at;
    created_at;
    updated_at;
};
exports.DesignerProfileEntity = DesignerProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignerRole, default: lib_1.DesignerRole.DESIGNER }),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], DesignerProfileEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignerRanks, default: lib_1.DesignerRanks.JUNIOR }),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => entity_user_1.UserEntity, (user) => user.designer),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_user_1.UserEntity)
], DesignerProfileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_assignments_1.OrderAssignmentEntity, (assignments) => assignments.designer),
    __metadata("design:type", Array)
], DesignerProfileEntity.prototype, "order_assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DesignerProfileEntity, (designer) => designer.supervisor),
    __metadata("design:type", Array)
], DesignerProfileEntity.prototype, "designers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DesignerProfileEntity, (designer) => designer.designers, {
        nullable: true,
        onDelete: "SET NULL",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], DesignerProfileEntity.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Array)
], DesignerProfileEntity.prototype, "designer_specifications", void 0);
__decorate([
    (0, typeorm_1.Column)("json"),
    __metadata("design:type", Array)
], DesignerProfileEntity.prototype, "working_days", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "resume_link", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "portfolio_link", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "opens_at", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], DesignerProfileEntity.prototype, "closes_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DesignerProfileEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DesignerProfileEntity.prototype, "updated_at", void 0);
exports.DesignerProfileEntity = DesignerProfileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "designer_profiles" }),
    (0, typeorm_1.Check)(`"id" <> "supervisorId"`)
], DesignerProfileEntity);
//# sourceMappingURL=entity.designer.js.map