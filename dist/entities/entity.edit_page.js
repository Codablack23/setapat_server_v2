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
exports.OrderEditPageEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_order_edits_1 = require("./entity.order_edits");
const entity_order_resize_1 = require("./entity.order_resize");
const schema_1 = require("../lib/schema");
let OrderEditPageEntity = class OrderEditPageEntity {
    id;
    page;
    revisions;
    price;
    created_at;
    completed_at;
    updated_at;
    order_edit;
    page_resizes;
};
exports.OrderEditPageEntity = OrderEditPageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OrderEditPageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], OrderEditPageEntity.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { default: 1 }),
    __metadata("design:type", Number)
], OrderEditPageEntity.prototype, "revisions", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', {
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
        default: schema_1.designPlans.BASIC.price.A * 25,
    }),
    __metadata("design:type", Number)
], OrderEditPageEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEditPageEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrderEditPageEntity.prototype, "completed_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEditPageEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_edits_1.OrderEditEntity, (orderEdit) => orderEdit.pages),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_edits_1.OrderEditEntity)
], OrderEditPageEntity.prototype, "order_edit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_resize_1.OrderResizeExtraEntity, (resize) => resize.edit_page),
    __metadata("design:type", Array)
], OrderEditPageEntity.prototype, "page_resizes", void 0);
exports.OrderEditPageEntity = OrderEditPageEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "order_edit_pages" })
], OrderEditPageEntity);
//# sourceMappingURL=entity.edit_page.js.map