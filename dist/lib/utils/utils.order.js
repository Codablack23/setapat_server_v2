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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersUtil = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entity_order_1 = require("../../entities/entity.order");
const luxon_1 = require("luxon");
const enum_1 = require("../enum");
let OrdersUtil = class OrdersUtil {
    orderRepository;
    packageSlug = {
        [enum_1.DesignPackage.BASIC]: 'BS',
        [enum_1.DesignPackage.STANDARD]: 'SD',
        [enum_1.DesignPackage.PREMIUM]: 'PM',
    };
    orderTypeSlug = {
        [enum_1.OrderType.ONE_OFF]: 'OP',
        [enum_1.OrderType.CUSTOMIZED]: 'CP',
    };
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async getOrderIdDetails(condition) {
        const orderCount = await this.orderRepository.count({ where: condition });
        const luxonDate = luxon_1.DateTime.now();
        const day = luxonDate.day.toString().padStart(2, '0');
        const month = luxonDate.month.toString().padStart(2, '0');
        const year = luxonDate.year.toString().slice(2);
        return { day, month, year, orderCount };
    }
    addDigitPrefix(value) {
        const str = value.toString();
        const minLength = 4;
        const targetLength = Math.max(minLength, Math.ceil(str.length / 3) * 3);
        return str.padStart(targetLength, '0');
    }
    async generateOrderNumber(designPackage, orderType = enum_1.OrderType.ONE_OFF, excludeDraft = false) {
        const condition = excludeDraft ? { status: (0, typeorm_2.Not)(enum_1.OrderStatus.DRAFT) } : {};
        const { orderCount, day, month, year } = await this.getOrderIdDetails(condition);
        const packageSlug = this.packageSlug[designPackage];
        const orderSlug = this.orderTypeSlug[orderType];
        const orderNumber = this.addDigitPrefix(orderCount + 1);
        return `SA${orderSlug}${packageSlug}${!excludeDraft ? 'DR' : ''}${day}${month}${year}${orderNumber}`;
    }
};
exports.OrdersUtil = OrdersUtil;
exports.OrdersUtil = OrdersUtil = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_order_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrdersUtil);
//# sourceMappingURL=utils.order.js.map