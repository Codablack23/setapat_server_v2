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
exports.OrderEntity = void 0;
const entity_order_receipts_1 = require("./entity.order_receipts");
const typeorm_1 = require("typeorm");
const lib_1 = require("../lib");
const schema_1 = require("../lib/schema/");
const entity_order_resize_1 = require("./entity.order_resize");
const entity_order_brief_1 = require("./entity.order_brief");
const entity_order_pages_1 = require("./entity.order_pages");
const entity_order_submissions_1 = require("./entity.order_submissions");
const entity_user_1 = require("./entity.user");
const entity_notification_1 = require("./entity.notification");
const entity_order_assignments_1 = require("./entity.order_assignments");
const entity_order_reviews_1 = require("./entity.order_reviews");
const entity_order_edits_1 = require("./entity.order_edits");
const entity_conversations_1 = require("./entity.conversations");
const luxon_1 = require("luxon");
const entity_used_discount_1 = require("./entity.used_discount");
let OrderEntity = class OrderEntity {
    id;
    design_class;
    order_id;
    total_revisions;
    design_brief;
    design_package;
    type;
    design_type;
    design_assets;
    design_preferences;
    design_samples;
    status;
    amount;
    delivery_time;
    confidential;
    quick_delivery;
    delivery_date;
    started_at;
    commenced_at;
    completed_at;
    last_edited_at;
    resize_extras;
    order_edits;
    order_assignments;
    brief_attachments;
    pages;
    submissions;
    conversations;
    reviews;
    receipts;
    notifications;
    user;
    discount;
    created_at;
    updated_at;
    generateDeliveryDate() {
        if (!this.delivery_date) {
            this.delivery_date = luxon_1.DateTime.now().plus({ hours: this.delivery_time ?? 24 }).toJSDate();
        }
    }
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignClass, default: lib_1.DesignClass.A }),
    __metadata("design:type", String)
], OrderEntity.prototype, "design_class", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { unique: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 2 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "total_revisions", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], OrderEntity.prototype, "design_brief", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.DesignPackage, default: lib_1.DesignPackage.BASIC }),
    __metadata("design:type", String)
], OrderEntity.prototype, "design_package", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.OrderType, default: lib_1.OrderType.ONE_OFF }),
    __metadata("design:type", String)
], OrderEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], OrderEntity.prototype, "design_type", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "design_assets", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "design_preferences", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "design_samples", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: lib_1.OrderStatus, default: lib_1.OrderStatus.DRAFT }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
    }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: schema_1.designPlans.BASIC.deliveryTime }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "delivery_time", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], OrderEntity.prototype, "confidential", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], OrderEntity.prototype, "quick_delivery", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "delivery_date", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "commenced_at", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "last_edited_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_resize_1.OrderResizeExtraEntity, (resizeExtras) => resizeExtras.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "resize_extras", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_edits_1.OrderEditEntity, (edits) => edits.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "order_edits", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_assignments_1.OrderAssignmentEntity, (assignments) => assignments.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "order_assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_brief_1.OrderBriefAttachmentEntity, (briefAttachments) => briefAttachments.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "brief_attachments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_pages_1.OrderPageEntity, (pages) => pages.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "pages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_submissions_1.OrderSubmissionEntity, (submissions) => submissions.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_conversations_1.ConversationEntity, (conversations) => conversations.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "conversations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_reviews_1.OrderReviewEntity, (review) => review.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_receipts_1.OrderReceiptEntity, (receipt) => receipt.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "receipts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_notification_1.NotificationEntity, (notification) => notification.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_user_1.UserEntity, (user) => user.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_user_1.UserEntity)
], OrderEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_used_discount_1.UsedDiscountEntity, (discount) => discount.orders, { nullable: true, onDelete: "SET NULL" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_used_discount_1.UsedDiscountEntity)
], OrderEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderEntity.prototype, "generateDeliveryDate", null);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "orders" })
], OrderEntity);
//# sourceMappingURL=entity.order.js.map