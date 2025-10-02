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
exports.ApplyDiscountDto = exports.UpdateDiscountDto = exports.CreateDiscountDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const entity_discount_1 = require("../../entities/entity.discount");
class CreateDiscountDto {
    type;
    code;
    description;
    duration_hours = 24;
    is_one_time = false;
    max_use;
    amount = 30;
    min_order_amount;
    max_discount_amount;
    starts_at;
    expires_at;
    active_time;
    active_days;
}
exports.CreateDiscountDto = CreateDiscountDto;
__decorate([
    (0, class_validator_1.IsEnum)(entity_discount_1.DiscountType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0.1, { message: 'duration_hours must be greater than 0' }),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "duration_hours", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDiscountDto.prototype, "is_one_time", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "max_use", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "min_order_amount", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDiscountDto.prototype, "max_discount_amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateDiscountDto.prototype, "starts_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateDiscountDto.prototype, "expires_at", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDiscountDto.prototype, "active_time", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(0),
    (0, class_validator_1.ArrayMaxSize)(7),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDiscountDto.prototype, "active_days", void 0);
class UpdateDiscountDto extends CreateDiscountDto {
    id;
}
exports.UpdateDiscountDto = UpdateDiscountDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateDiscountDto.prototype, "id", void 0);
class ApplyDiscountDto {
    order_id;
}
exports.ApplyDiscountDto = ApplyDiscountDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ApplyDiscountDto.prototype, "order_id", void 0);
//# sourceMappingURL=create-discount.dto.js.map