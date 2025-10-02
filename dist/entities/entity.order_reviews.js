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
exports.OrderReviewEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
let OrderReviewEntity = class OrderReviewEntity {
    id;
    rating;
    comment;
    created_at;
    completed_at;
    updated_at;
    order;
};
exports.OrderReviewEntity = OrderReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderReviewEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int"
    }),
    __metadata("design:type", Number)
], OrderReviewEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "longtext",
        nullable: true
    }),
    __metadata("design:type", String)
], OrderReviewEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderReviewEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderReviewEntity.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderReviewEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.reviews),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderReviewEntity.prototype, "order", void 0);
exports.OrderReviewEntity = OrderReviewEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "order_reviews" })
], OrderReviewEntity);
//# sourceMappingURL=entity.order_reviews.js.map