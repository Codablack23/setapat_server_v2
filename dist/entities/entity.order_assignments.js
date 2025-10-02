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
exports.OrderAssignmentEntity = void 0;
const lib_1 = require("../lib");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
const entity_designer_1 = require("./entity.designer");
let OrderAssignmentEntity = class OrderAssignmentEntity {
    id;
    status;
    order;
    designer;
    withdrawn_at;
    created_at;
    updated_at;
};
exports.OrderAssignmentEntity = OrderAssignmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderAssignmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lib_1.OrderAssignmentStatus,
        default: lib_1.OrderAssignmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], OrderAssignmentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.order_assignments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderAssignmentEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_designer_1.DesignerProfileEntity, (designer) => designer.order_assignments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_designer_1.DesignerProfileEntity)
], OrderAssignmentEntity.prototype, "designer", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { nullable: true }),
    __metadata("design:type", String)
], OrderAssignmentEntity.prototype, "withdrawn_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderAssignmentEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderAssignmentEntity.prototype, "updated_at", void 0);
exports.OrderAssignmentEntity = OrderAssignmentEntity = __decorate([
    (0, typeorm_1.Entity)('order_assignments')
], OrderAssignmentEntity);
//# sourceMappingURL=entity.order_assignments.js.map