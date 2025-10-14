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
exports.CreateOrderReviewDto = exports.AddOrderSubmissionsDto = exports.OrderSubmissionDto = exports.MakeOrderConfidentialDto = exports.AddDesignBriefDto = exports.BriefAttachmentDto = exports.ResizeExtraDto = exports.UpdateOrderDto = void 0;
const create_order_dto_1 = require("./create-order.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const lib_1 = require("../../lib");
class UpdateOrderDto extends (0, swagger_1.PartialType)(create_order_dto_1.CreateOrderDto) {
}
exports.UpdateOrderDto = UpdateOrderDto;
class ResizeExtraDto {
    design_type;
    unit;
    design_page;
    page;
    price;
    width;
    height;
}
exports.ResizeExtraDto = ResizeExtraDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Poster Design', description: 'Type of design' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResizeExtraDto.prototype, "design_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: lib_1.DesignUnits,
        description: 'Measurement unit for the design',
    }),
    (0, class_validator_1.IsEnum)(lib_1.DesignUnits),
    __metadata("design:type", String)
], ResizeExtraDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Number of design pages' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResizeExtraDto.prototype, "design_page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Page number related to resize' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResizeExtraDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Page number related to resize' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(lib_1.RESIZE_COST, {
        message: `Price should atleast be ₦${lib_1.RESIZE_COST.toLocaleString()}`,
    }),
    __metadata("design:type", Number)
], ResizeExtraDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1080, description: 'Width of the design in px' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResizeExtraDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1920, description: 'Height of the design in px' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ResizeExtraDto.prototype, "height", void 0);
class BriefAttachmentDto {
    type;
    name;
    extension;
    file_size;
    audio_length;
    file_url;
}
exports.BriefAttachmentDto = BriefAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: lib_1.AttachmentTypes,
        description: 'Type of attachment (image, audio, etc.)',
    }),
    (0, class_validator_1.IsEnum)(lib_1.AttachmentTypes),
    __metadata("design:type", String)
], BriefAttachmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Logo File', description: 'File name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BriefAttachmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'png', description: 'File extension' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BriefAttachmentDto.prototype, "extension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2048, description: 'File size in KB' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BriefAttachmentDto.prototype, "file_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 120,
        description: 'Length of audio file in seconds',
        required: false,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], BriefAttachmentDto.prototype, "audio_length", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cdn.example.com/files/logo.png',
        description: 'URL to file',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BriefAttachmentDto.prototype, "file_url", void 0);
class AddDesignBriefDto {
    design_brief;
    design_assets;
    amount;
    design_preference;
    design_samples;
    resize_extras;
    brief_attachments;
}
exports.AddDesignBriefDto = AddDesignBriefDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'We want a modern, minimalistic poster design',
        description: 'Brief for the design order',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddDesignBriefDto.prototype, "design_brief", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['https://cdn.example.com/assets/brand-guide.pdf'],
        description: 'List of uploaded asset URLs',
        required: false,
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddDesignBriefDto.prototype, "design_assets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1,000',
        description: 'Update amount from other costing',
        required: false,
        type: 'number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1000, { message: 'Please provide amount greater than 10000' }),
    __metadata("design:type", Number)
], AddDesignBriefDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['https://cdn.example.com/samples/sample1.png'],
        description: 'Preferred design styles',
        required: false,
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddDesignBriefDto.prototype, "design_preference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['https://cdn.example.com/samples/sample1.png'],
        description: 'Sample references for the design',
        required: false,
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddDesignBriefDto.prototype, "design_samples", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of resize extra details',
        required: false,
        type: [ResizeExtraDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ResizeExtraDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddDesignBriefDto.prototype, "resize_extras", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of brief attachments',
        required: false,
        type: [BriefAttachmentDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BriefAttachmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddDesignBriefDto.prototype, "brief_attachments", void 0);
class MakeOrderConfidentialDto {
    confidential = false;
}
exports.MakeOrderConfidentialDto = MakeOrderConfidentialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Show confidential status',
        required: false,
        type: Boolean,
        default: false,
        nullable: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MakeOrderConfidentialDto.prototype, "confidential", void 0);
class OrderSubmissionDto {
    type;
    page_type;
    resize_page;
    export_format;
    page;
    file_url;
    file_name;
    file_size;
    file_type;
    file_extension;
}
exports.OrderSubmissionDto = OrderSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: lib_1.SubmissionType,
        description: 'Type of submission',
        default: lib_1.SubmissionType.ORDER,
    }),
    (0, class_validator_1.IsEnum)(lib_1.SubmissionType),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: lib_1.SubmissionPageType,
        description: 'Page type of submission',
        default: lib_1.SubmissionPageType.PAGE,
    }),
    (0, class_validator_1.IsEnum)(lib_1.SubmissionPageType),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "page_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Resize page number if submission is a resize',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderSubmissionDto.prototype, "resize_page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: lib_1.DesignExportFormats,
        description: 'Export format of the design',
    }),
    (0, class_validator_1.IsEnum)(lib_1.DesignExportFormats),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "export_format", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Page number in the order' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderSubmissionDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://cdn.example.com/file.png',
        description: 'URL to the submitted file',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "file_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'file.png', description: 'File name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "file_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2048,
        description: 'File size in bytes',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderSubmissionDto.prototype, "file_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: lib_1.AttachmentTypes, description: 'Attachment type' }),
    (0, class_validator_1.IsEnum)(lib_1.AttachmentTypes),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "file_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'png', description: 'File extension' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrderSubmissionDto.prototype, "file_extension", void 0);
class AddOrderSubmissionsDto {
    submissions;
}
exports.AddOrderSubmissionsDto = AddOrderSubmissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [OrderSubmissionDto],
        description: 'Array of order submissions',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderSubmissionDto),
    __metadata("design:type", Array)
], AddOrderSubmissionsDto.prototype, "submissions", void 0);
class CreateOrderReviewDto {
    rating;
    comment;
}
exports.CreateOrderReviewDto = CreateOrderReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating for the order (1-5)',
        minimum: 1,
        maximum: 5,
        type: Number,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateOrderReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional comment for the review',
        required: false,
        type: String,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrderReviewDto.prototype, "comment", void 0);
//# sourceMappingURL=update-order.dto.js.map