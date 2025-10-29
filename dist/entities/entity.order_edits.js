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
exports.OrderEditEntity = void 0;
const entity_order_submissions_1 = require("./entity.order_submissions");
const lib_1 = require("../lib");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
const entity_edit_page_1 = require("./entity.edit_page");
const entity_revisions_1 = require("./entity.revisions");
let OrderEditEntity = class OrderEditEntity {
    id;
    status;
    created_at;
    delivery_time = 4;
    amount;
    delivery_date;
    completed_at;
    updated_at;
    order;
    submissions;
    revisions;
    pages;
};
exports.OrderEditEntity = OrderEditEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderEditEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: lib_1.OrderEditStatus,
        default: lib_1.OrderEditStatus.IN_PROGRESS
    }),
    __metadata("design:type", String)
], OrderEditEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEditEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 4 }),
    __metadata("design:type", Number)
], OrderEditEntity.prototype, "delivery_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
    }),
    __metadata("design:type", Number)
], OrderEditEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime"),
    __metadata("design:type", Date)
], OrderEditEntity.prototype, "delivery_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEditEntity.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEditEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.order_edits),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderEditEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_submissions_1.OrderSubmissionEntity, (submissions) => submissions.order_edit),
    __metadata("design:type", entity_order_submissions_1.OrderSubmissionEntity)
], OrderEditEntity.prototype, "submissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_revisions_1.SubmissionRevisions, (revisions) => revisions.order_edit),
    __metadata("design:type", entity_revisions_1.SubmissionRevisions)
], OrderEditEntity.prototype, "revisions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_edit_page_1.OrderEditPageEntity, (pages) => pages.order_edit),
    __metadata("design:type", Array)
], OrderEditEntity.prototype, "pages", void 0);
exports.OrderEditEntity = OrderEditEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "order_edits" })
], OrderEditEntity);
//# sourceMappingURL=entity.order_edits.js.map