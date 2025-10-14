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
exports.OrderResizeExtraEntity = void 0;
const lib_1 = require("../lib");
const schema_1 = require("../lib/schema");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
const entity_edit_page_1 = require("./entity.edit_page");
const entity_order_pages_1 = require("./entity.order_pages");
let OrderResizeExtraEntity = class OrderResizeExtraEntity {
    id;
    design_type;
    unit;
    page;
    price;
    width;
    height;
    order;
    edit_page;
    order_page;
};
exports.OrderResizeExtraEntity = OrderResizeExtraEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderResizeExtraEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], OrderResizeExtraEntity.prototype, "design_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: lib_1.DesignUnits }),
    __metadata("design:type", String)
], OrderResizeExtraEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], OrderResizeExtraEntity.prototype, "page", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', {
        transformer: {
            to: (value) => {
                if (value == null)
                    return 0;
                const num = Number(value);
                return Math.round(num * 100);
            },
            from: (value) => {
                if (!value)
                    return 0;
                return Number(value) / 100;
            },
        },
        default: schema_1.RESIZE_COST * 100,
    }),
    __metadata("design:type", Number)
], OrderResizeExtraEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], OrderResizeExtraEntity.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], OrderResizeExtraEntity.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.resize_extras, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderResizeExtraEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_edit_page_1.OrderEditPageEntity, (page) => page.page_resizes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_edit_page_1.OrderEditPageEntity)
], OrderResizeExtraEntity.prototype, "edit_page", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_pages_1.OrderPageEntity, (page) => page.page_resizes, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_pages_1.OrderPageEntity)
], OrderResizeExtraEntity.prototype, "order_page", void 0);
exports.OrderResizeExtraEntity = OrderResizeExtraEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_resize_extras' })
], OrderResizeExtraEntity);
//# sourceMappingURL=entity.order_resize.js.map