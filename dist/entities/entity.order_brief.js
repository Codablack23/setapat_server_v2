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
exports.OrderBriefAttachmentEntity = void 0;
const lib_1 = require("../lib");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
let OrderBriefAttachmentEntity = class OrderBriefAttachmentEntity {
    id;
    type;
    name;
    caption;
    extension;
    file_size;
    audio_length;
    file_url;
    order;
};
exports.OrderBriefAttachmentEntity = OrderBriefAttachmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lib_1.AttachmentTypes,
    }),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "caption", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'png',
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        name: 'file_size',
    }),
    __metadata("design:type", Number)
], OrderBriefAttachmentEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'audio_length',
    }),
    __metadata("design:type", Number)
], OrderBriefAttachmentEntity.prototype, "audio_length", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
        name: 'file_url',
    }),
    __metadata("design:type", String)
], OrderBriefAttachmentEntity.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.brief_attachments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderBriefAttachmentEntity.prototype, "order", void 0);
exports.OrderBriefAttachmentEntity = OrderBriefAttachmentEntity = __decorate([
    (0, typeorm_1.Entity)('order_brief_attachments')
], OrderBriefAttachmentEntity);
//# sourceMappingURL=entity.order_brief.js.map