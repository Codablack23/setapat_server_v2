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
exports.CreateOrderDto = exports.PagesDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const lib_1 = require("../../lib");
class PagesDto {
    is_default = false;
    design_type;
    paper_size;
    paper_type;
    unit;
    page_number;
    price;
    width;
    height;
}
exports.PagesDto = PagesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether this page is the default page',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PagesDto.prototype, "is_default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of design for the page',
        example: 'Flyer',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a design type for your page setup' }),
    (0, class_validator_1.IsString)({ message: 'Page Design type must be a string' }),
    __metadata("design:type", String)
], PagesDto.prototype, "design_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The size of the paper (A4, Letter, etc.)',
        example: 'A4',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a paper size' }),
    (0, class_validator_1.IsString)({ message: 'Paper size must be a string' }),
    __metadata("design:type", String)
], PagesDto.prototype, "paper_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of paper (Flex Banner)',
        example: 'Flex Banner',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a paper type' }),
    (0, class_validator_1.IsString)({ message: 'Paper type must be a string' }),
    __metadata("design:type", String)
], PagesDto.prototype, "paper_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unit of measurement for dimensions',
        enum: lib_1.DesignUnits,
        example: lib_1.DesignUnits.mm,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a unit' }),
    (0, class_validator_1.IsEnum)(lib_1.DesignUnits, {
        message: `Unit can only be ${Object.values(lib_1.DesignUnits).join(', ')}`,
    }),
    __metadata("design:type", String)
], PagesDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number',
        example: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide page number' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Page number must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Page number must be at least 1' }),
    __metadata("design:type", Number)
], PagesDto.prototype, "page_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page Cost',
        example: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide page price' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Page price must be a number' }),
    (0, class_validator_1.Min)(lib_1.designPlans.BASIC.price.A1, {
        message: `Page price must be at least ₦${lib_1.designPlans.BASIC.price.A1.toLocaleString()}`,
    }),
    __metadata("design:type", Number)
], PagesDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page width in chosen unit',
        example: 210,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide width' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Width must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Width must be at least 1' }),
    __metadata("design:type", Number)
], PagesDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page height in chosen unit',
        example: 297,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide height' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Height must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Height must be at least 1' }),
    __metadata("design:type", Number)
], PagesDto.prototype, "height", void 0);
class CreateOrderDto {
    design_type;
    design_class;
    quick_delivery = false;
    design_package;
    delivery_time;
    amount;
    pages;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the design',
        example: 'Poster',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a design type' }),
    (0, class_validator_1.IsString)({ message: 'Design type must be a string' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "design_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class of the design',
        enum: lib_1.DesignClass,
        example: lib_1.DesignClass.A,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a design class' }),
    (0, class_validator_1.IsEnum)(lib_1.DesignClass, {
        message: `Design class can only be ${Object.values(lib_1.DesignClass).join(', ')}`,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "design_class", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Quick delivery flag',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Quick delivery should be a boolean' }),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "quick_delivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Package of the design',
        enum: lib_1.DesignPackage,
        example: lib_1.DesignPackage.STANDARD,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide a design package' }),
    (0, class_validator_1.IsEnum)(lib_1.DesignPackage, {
        message: `Design package can only be ${Object.values(lib_1.DesignPackage).join(', ')}`,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "design_package", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Delivery time in days',
        example: 7,
        minimum: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide delivery time' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Delivery time must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Delivery time must be at least 1' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "delivery_time", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide amount' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Amount must be a number' }),
    (0, class_validator_1.Min)(1, { message: 'Amount should atleast be 1' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of pages for the order',
        type: [PagesDto],
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Please provide page setup' }),
    (0, class_validator_1.IsArray)({ message: 'Pages must be an array' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'At least one page must be provided' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PagesDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "pages", void 0);
//# sourceMappingURL=create-order.dto.js.map