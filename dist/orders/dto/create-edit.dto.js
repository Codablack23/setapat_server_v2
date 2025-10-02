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
exports.CreateOrderEditDto = exports.CreateOrderEditPageDto = exports.CreateOrderResizeExtraDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lib_1 = require("../../lib");
class CreateOrderResizeExtraDto {
    design_type;
    unit;
    amount;
    page;
    width;
    height;
}
exports.CreateOrderResizeExtraDto = CreateOrderResizeExtraDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type of design', example: 'Flyer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderResizeExtraDto.prototype, "design_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unit type', enum: lib_1.DesignUnits }),
    (0, class_validator_1.IsEnum)(lib_1.DesignUnits),
    __metadata("design:type", String)
], CreateOrderResizeExtraDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount', example: 5000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderResizeExtraDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resize Page Number', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderResizeExtraDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Width of resized page', example: 1080 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderResizeExtraDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Height of resized page', example: 1920 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderResizeExtraDto.prototype, "height", void 0);
class CreateOrderEditPageDto {
    page;
    revisions = 1;
    price = 1;
    page_resizes;
}
exports.CreateOrderEditPageDto = CreateOrderEditPageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Page number', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderEditPageDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of revisions for this page', example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderEditPageDto.prototype, "revisions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'edit cost', example: 1000, required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(lib_1.designPlans.BASIC.price.A * 0.25),
    __metadata("design:type", Number)
], CreateOrderEditPageDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateOrderResizeExtraDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderResizeExtraDto),
    __metadata("design:type", Array)
], CreateOrderEditPageDto.prototype, "page_resizes", void 0);
class CreateOrderEditDto {
    pages;
}
exports.CreateOrderEditDto = CreateOrderEditDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateOrderEditPageDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderEditPageDto),
    __metadata("design:type", Array)
], CreateOrderEditDto.prototype, "pages", void 0);
//# sourceMappingURL=create-edit.dto.js.map