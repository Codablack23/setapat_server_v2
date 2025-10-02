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
exports.OrderPageEntity = void 0;
const lib_1 = require("../lib");
const schema_1 = require("../lib/schema");
const typeorm_1 = require("typeorm");
const entity_order_1 = require("./entity.order");
const entity_order_resize_1 = require("./entity.order_resize");
let OrderPageEntity = class OrderPageEntity {
    id;
    is_default;
    design_type;
    paper_size;
    paper_type;
    unit;
    orientation;
    page_number;
    price;
    width;
    height;
    order;
    page_resizes;
    setOrientation() {
        this.orientation =
            this.width >= this.height ? lib_1.Orientation.LANDSCAPE : lib_1.Orientation.PORTRAIT;
    }
};
exports.OrderPageEntity = OrderPageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OrderPageEntity.prototype, "is_default", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'design_type', type: 'text', nullable: false }),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "design_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paper_size', type: 'text', nullable: false }),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "paper_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paper_type', type: 'text', nullable: false }),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "paper_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: lib_1.DesignUnits, nullable: false }),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: lib_1.Orientation, nullable: false }),
    __metadata("design:type", String)
], OrderPageEntity.prototype, "orientation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_number', type: 'bigint', nullable: false }),
    __metadata("design:type", Number)
], OrderPageEntity.prototype, "page_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: schema_1.designPlans.BASIC.price.A * 100,
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
    }),
    __metadata("design:type", Number)
], OrderPageEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
        nullable: false,
    }),
    __metadata("design:type", Number)
], OrderPageEntity.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        transformer: {
            to: (value) => Math.round(value * 100),
            from: (value) => Number(value) / 100,
        },
        nullable: false,
    }),
    __metadata("design:type", Number)
], OrderPageEntity.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_order_1.OrderEntity, (order) => order.pages, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_order_1.OrderEntity)
], OrderPageEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entity_order_resize_1.OrderResizeExtraEntity, (resize) => resize.order_page, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], OrderPageEntity.prototype, "page_resizes", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderPageEntity.prototype, "setOrientation", null);
exports.OrderPageEntity = OrderPageEntity = __decorate([
    (0, typeorm_1.Entity)('order_pages')
], OrderPageEntity);
//# sourceMappingURL=entity.order_pages.js.map