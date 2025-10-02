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
exports.DiscountEntity = exports.DiscountType = void 0;
const typeorm_1 = require("typeorm");
const entity_used_discount_1 = require("./entity.used_discount");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "PERCENTAGE";
    DiscountType["FLAT"] = "FLAT";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
let DiscountEntity = class DiscountEntity {
    id;
    type;
    code;
    description;
    duration_hours = 24;
    is_one_time;
    is_active;
    max_use;
    amount;
    min_order_amount;
    max_discount_amount;
    starts_at;
    expires_at;
    active_time;
    active_days;
    created_at;
    updated_at;
    used_discounts;
};
exports.DiscountEntity = DiscountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DiscountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DiscountType,
        default: DiscountType.PERCENTAGE,
    }),
    __metadata("design:type", String)
], DiscountEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], DiscountEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], DiscountEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        transformer: {
            to(value) {
                return Math.round(value * 100);
            },
            from(value) {
                return value / 100;
            },
        },
    }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "duration_hours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DiscountEntity.prototype, "is_one_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], DiscountEntity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "max_use", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 30 }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "min_order_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], DiscountEntity.prototype, "max_discount_amount", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DiscountEntity.prototype, "starts_at", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DiscountEntity.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], DiscountEntity.prototype, "active_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DiscountEntity.prototype, "active_days", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DiscountEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DiscountEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_used_discount_1.UsedDiscountEntity, (usedDiscount) => usedDiscount.discount),
    __metadata("design:type", Array)
], DiscountEntity.prototype, "used_discounts", void 0);
exports.DiscountEntity = DiscountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'discounts' })
], DiscountEntity);
//# sourceMappingURL=entity.discount.js.map