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
exports.OrderSubmissionEntity = void 0;
const lib_1 = require("../lib");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
const entity_order_edits_1 = require("./entity.order_edits");
const entity_messages_1 = require("./entity.messages");
let OrderSubmissionEntity = class OrderSubmissionEntity {
    id;
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
    created_at;
    updated_at;
    order;
    message;
    order_edit;
};
exports.OrderSubmissionEntity = OrderSubmissionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: lib_1.SubmissionType,
        default: lib_1.SubmissionType.ORDER
    }),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: lib_1.SubmissionPageType,
        default: lib_1.SubmissionPageType.PAGE
    }),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "page_type", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { nullable: true }),
    __metadata("design:type", Number)
], OrderSubmissionEntity.prototype, "resize_page", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignExportFormats }),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "export_format", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], OrderSubmissionEntity.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { nullable: true }),
    __metadata("design:type", Number)
], OrderSubmissionEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.AttachmentTypes }),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "file_type", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], OrderSubmissionEntity.prototype, "file_extension", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderSubmissionEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderSubmissionEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.submissions),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderSubmissionEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_messages_1.MessageEntity, (message) => message.order_submissions),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_messages_1.MessageEntity)
], OrderSubmissionEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_edits_1.OrderEditEntity, (orderEdit) => orderEdit.submissions, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_edits_1.OrderEditEntity)
], OrderSubmissionEntity.prototype, "order_edit", void 0);
exports.OrderSubmissionEntity = OrderSubmissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "order_submissions" })
], OrderSubmissionEntity);
//# sourceMappingURL=entity.order_submissions.js.map