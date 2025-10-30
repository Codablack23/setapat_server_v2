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
exports.UsedDiscountEntity = exports.UsedDisountStatus = void 0;
const typeorm_1 = require("typeorm");
const entity_discount_1 = require("./entity.discount");
const entity_order_1 = require("./entity.order");
var UsedDisountStatus;
(function (UsedDisountStatus) {
    UsedDisountStatus["PENDING"] = "PENDING";
    UsedDisountStatus["USED"] = "USED";
})(UsedDisountStatus || (exports.UsedDisountStatus = UsedDisountStatus = {}));
let UsedDiscountEntity = class UsedDiscountEntity {
    id;
    status;
    amount;
    discount;
    orders;
    created_at;
    updated_at;
};
exports.UsedDiscountEntity = UsedDiscountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UsedDiscountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UsedDisountStatus,
        default: UsedDisountStatus.PENDING,
    }),
    __metadata("design:type", String)
], UsedDiscountEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        transformer: {
            from(value) {
                return value / 100;
            },
            to(value) {
                return value * 100;
            },
        },
        default: 3000,
    }),
    __metadata("design:type", Number)
], UsedDiscountEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_discount_1.DiscountEntity, (discount) => discount.used_discounts),
    __metadata("design:type", entity_discount_1.DiscountEntity)
], UsedDiscountEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_1.OrderEntity, (orders) => orders.discount, { cascade: true }),
    __metadata("design:type", Array)
], UsedDiscountEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UsedDiscountEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UsedDiscountEntity.prototype, "updated_at", void 0);
exports.UsedDiscountEntity = UsedDiscountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'used_discounts' })
], UsedDiscountEntity);
//# sourceMappingURL=entity.used_discount.js.map