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
exports.DiscountInjectableUtils = exports.DiscountUtils = void 0;
const common_1 = require("@nestjs/common");
const entity_discount_1 = require("../../entities/entity.discount");
const index_1 = require("../index");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const luxon_1 = require("luxon");
let DiscountUtils = class DiscountUtils {
    constructor() { }
    static validateDiscount(discount, totalUsed, usedDiscounts) {
        if (!discount.is_active) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Voucher is not active'));
        }
        const filteredUsedDisounts = this.getUsedDiscountsPerCycle(discount.cycle_type, usedDiscounts);
        const totalAmountDiscounted = filteredUsedDisounts.reduce((acc, item) => acc + item.amount, 0);
        const now = new Date();
        this.ensureWithinStartAndExpiry(discount, now);
        this.ensureActiveDays(discount, now);
        this.ensureActiveTime(discount, now);
        if (discount.type == entity_discount_1.DiscountType.FLAT) {
            if (discount.amount - totalAmountDiscounted == 0) {
                throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('This voucher balance is 0'));
            }
        }
        else {
            this.ensureMaxUse(discount, totalUsed);
        }
        return discount;
    }
    static getUsedDiscountsPerCycle(cycle = entity_discount_1.DiscountCycleType.NONE, usedDiscounts = []) {
        const now = luxon_1.DateTime.now();
        if (cycle === entity_discount_1.DiscountCycleType.NONE)
            return usedDiscounts;
        let cycleStart;
        switch (cycle) {
            case entity_discount_1.DiscountCycleType.HOURLY:
                cycleStart = now.startOf('hour');
                break;
            case entity_discount_1.DiscountCycleType.DAILY:
                cycleStart = now.startOf('day');
                break;
            case entity_discount_1.DiscountCycleType.WEEKLY:
                cycleStart = now.startOf('week');
                break;
            case entity_discount_1.DiscountCycleType.MONTHLY:
                cycleStart = now.startOf('month');
                break;
            case entity_discount_1.DiscountCycleType.QUARTERLY:
                cycleStart = now.startOf('quarter');
                break;
            case entity_discount_1.DiscountCycleType.YEARLY:
                cycleStart = now.startOf('year');
                break;
            default:
                cycleStart = luxon_1.DateTime.fromISO('1900-01-01T00:00:00Z');
                break;
        }
        return usedDiscounts.filter((item) => {
            const usedAt = luxon_1.DateTime.fromJSDate(new Date(item.created_at));
            return usedAt >= cycleStart;
        });
    }
    static getUsedDiscountsPerCycleAmount(cycle = entity_discount_1.DiscountCycleType.NONE, usedDiscounts = []) {
        const filtered = this.getUsedDiscountsPerCycle(cycle, usedDiscounts);
        return filtered.reduce((acc, item) => acc + item.amount, 0);
    }
    static ensureFieldsForCreation(dto) {
        const hasActiveDays = dto.active_days && dto.active_days.length > 0;
        const hasActiveTime = !!dto.active_time;
        const hasStartAt = !!dto.starts_at;
        const isOneTime = !!dto.is_one_time;
        let category = null;
        if (hasActiveDays || hasActiveTime)
            category = 'CYCLE';
        else if (hasStartAt)
            category = 'LONG_TERM';
        else if (isOneTime)
            category = 'ONE_TIME';
        if (!category) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount must have at least one defining field (active_days, active_time, starts_at, or is_one_time)'));
        }
        switch (category) {
            case 'CYCLE':
                if (!hasActiveDays) {
                    throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Cycle discount requires active_days'));
                }
                if (!hasActiveTime) {
                    throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Cycle discount requires active_time'));
                }
                break;
            case 'LONG_TERM':
                if (!hasStartAt || !dto.expires_at) {
                    throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Long-term discount requires both starts_at and expires_at'));
                }
                break;
            case 'ONE_TIME':
                dto.max_use = 1;
                break;
        }
        if (dto.duration_hours == null) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount must have duration_hours defined'));
        }
        return dto;
    }
    static calculateDiscountAmount(discount, orderTotal) {
        let discounted = 0;
        if (discount.type === entity_discount_1.DiscountType.PERCENTAGE) {
            discounted = orderTotal * (Number(discount.amount) / 100);
            if (discount.max_discount_amount) {
                discounted = Math.min(discounted, Number(discount.max_discount_amount));
            }
        }
        else {
            discounted = Number(discount.amount);
        }
        return discounted;
    }
    static getActiveEndTime(discount, referenceDate = new Date()) {
        if (!discount.active_time)
            return null;
        const [h, m, s] = discount.active_time.split(':').map(Number);
        const start = new Date(referenceDate);
        start.setHours(h, m, s, 0);
        const end = new Date(start);
        end.setHours(start.getHours() + Math.floor(discount.duration_hours));
        end.setMinutes(start.getMinutes() + (discount.duration_hours % 1) * 60);
        return end;
    }
    static ensureWithinStartAndExpiry(discount, now) {
        if (discount.starts_at && now < discount.starts_at) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Voucher can not be applied yet'));
        }
        if (discount.expires_at && now > discount.expires_at) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Voucher Expired!'));
        }
    }
    static ensureActiveDays(discount, now) {
        if (discount.active_days && discount.active_days.length > 0) {
            const today = now.getDay();
            if (!discount.active_days.includes(today)) {
                throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount not active today'));
            }
        }
    }
    static ensureActiveTime(discount, now) {
        if (!discount.active_time)
            return;
        const end = this.getActiveEndTime(discount, now);
        const [h, m, s] = discount.active_time.split(':').map(Number);
        const start = new Date(now);
        start.setHours(h, m, s, 0);
        if (now < start || (end && now > end)) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount not active at this time'));
        }
    }
    static ensureMinOrderAmount(discount, orderTotal) {
        if (discount.min_order_amount &&
            orderTotal < Number(discount.min_order_amount)) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Order total too low for this discount'));
        }
    }
    static ensureMaxUse(discount, totalUsed) {
        if (discount.max_use && totalUsed && totalUsed >= discount.max_use) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount has reached maximum usage'));
        }
        if (discount.is_one_time && totalUsed && totalUsed >= 1) {
            throw new common_1.BadRequestException(index_1.AppResponse.getFailedResponse('Discount already used'));
        }
    }
};
exports.DiscountUtils = DiscountUtils;
exports.DiscountUtils = DiscountUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DiscountUtils);
let DiscountInjectableUtils = class DiscountInjectableUtils {
    discountRepo;
    constructor(discountRepo) {
        this.discountRepo = discountRepo;
    }
    async generateNextDiscountCode() {
        const year = new Date().getFullYear();
        const lastDiscount = await this.discountRepo
            .createQueryBuilder('discount')
            .where('discount.code LIKE :yearPrefix', { yearPrefix: `SP${year}%` })
            .orderBy('discount.created_at', 'DESC')
            .getOne();
        let nextNumber = 1;
        if (lastDiscount?.code) {
            const match = lastDiscount.code.match(new RegExp(`SP${year}(\\d+)$`));
            if (match)
                nextNumber = parseInt(match[1], 10) + 1;
        }
        const padded = String(nextNumber).padStart(3, '0');
        return `SP${year}${padded}`;
    }
};
exports.DiscountInjectableUtils = DiscountInjectableUtils;
exports.DiscountInjectableUtils = DiscountInjectableUtils = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_discount_1.DiscountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiscountInjectableUtils);
//# sourceMappingURL=util.discount.js.map