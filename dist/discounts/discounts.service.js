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
exports.DiscountsService = void 0;
const entity_discount_1 = require("./../entities/entity.discount");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_discount_2 = require("../entities/entity.discount");
const typeorm_2 = require("typeorm");
const lib_1 = require("../lib");
const util_discount_1 = require("../lib/utils/util.discount");
const entity_used_discount_1 = require("../entities/entity.used_discount");
const entities_1 = require("../entities");
let DiscountsService = class DiscountsService {
    discountRepo;
    usedDiscountRepo;
    orderRepo;
    constructor(discountRepo, usedDiscountRepo, orderRepo) {
        this.discountRepo = discountRepo;
        this.usedDiscountRepo = usedDiscountRepo;
        this.orderRepo = orderRepo;
    }
    create(createDiscountDto) {
        return 'This action adds a new discount';
    }
    findAll() {
        return `This action returns all discounts`;
    }
    async findOne(code) {
        const discount = await this.discountRepo.findOne({
            where: {
                code,
            },
            relations: {
                used_discounts: true,
            },
        });
        if (!discount) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Voucher Not Found!'));
        }
        const usedDiscounts = discount.used_discounts.filter((item) => item.status == entity_used_discount_1.UsedDisountStatus.USED);
        const voucher = util_discount_1.DiscountUtils.validateDiscount(discount, usedDiscounts.length);
        const used_discount_amount = util_discount_1.DiscountUtils.getUsedDiscountsPerCycleAmount(voucher.cycle_type, usedDiscounts);
        const used_discounts = util_discount_1.DiscountUtils.getUsedDiscountsPerCycle(discount.cycle_type, usedDiscounts);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'voucher retrieved successfully',
            data: {
                voucher: {
                    ...voucher,
                    used_discount_amount,
                    used_discounts,
                },
            },
        });
    }
    async applyDiscount(code, applyDiscountDto) {
        const discount = await this.discountRepo.findOne({
            where: {
                code,
            },
            relations: {
                used_discounts: {
                    user: true,
                },
            },
        });
        if (!discount) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Voucher does not exist'));
        }
        const order = await this.orderRepo.findOne({
            where: {
                id: applyDiscountDto.order_id,
            },
            relations: {
                pages: true,
                user: true,
                resize_extras: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        }
        const usedDiscountsPerUser = discount.used_discounts.filter((item) => item.status == entity_used_discount_1.UsedDisountStatus.USED && item.user?.id == order.user.id);
        const usedDiscounts = discount.used_discounts.filter((item) => item.status == entity_used_discount_1.UsedDisountStatus.USED);
        const voucher = util_discount_1.DiscountUtils.validateDiscount(discount, discount.cycle_type == entity_discount_1.DiscountCycleType.NONE
            ? usedDiscounts.length
            : usedDiscountsPerUser.length, discount.cycle_type == entity_discount_1.DiscountCycleType.NONE
            ? usedDiscounts
            : usedDiscountsPerUser);
        const used_discount_amount = util_discount_1.DiscountUtils.getUsedDiscountsPerCycleAmount(voucher.cycle_type, usedDiscounts);
        if (voucher.allowed_user_email && voucher.allowed_user_email.length) {
            if (!voucher.allowed_user_email.includes(order.user.email)) {
                throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Sorry, this voucher code isn’t available for your account.'));
            }
        }
        const usableBalance = voucher.amount - used_discount_amount;
        const orderAmount = order.pages.reduce((acc, item) => acc + item.price, 0);
        const resizeAmount = order.resize_extras.reduce((acc, item) => acc + item.price, 0);
        const quickDeliveryAmount = order.quick_delivery ? orderAmount * 0.25 : 0;
        const amount = orderAmount + resizeAmount + quickDeliveryAmount;
        const percentageAmount = orderAmount * (voucher.amount / 100);
        const usedDiscount = this.usedDiscountRepo.create({
            discount,
            amount: voucher.type == entity_discount_2.DiscountType.FLAT
                ? Math.min(amount, usableBalance)
                : percentageAmount,
        });
        if (usableBalance < 1 && voucher.type == entity_discount_2.DiscountType.FLAT) {
            throw new common_1.BadRequestException(lib_1.AppResponse.getFailedResponse('This is voucher has no usable balance'));
        }
        const orderDiscount = await this.usedDiscountRepo.save(usedDiscount);
        order.discount = orderDiscount;
        await this.orderRepo.save(order);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Voucher applied successfully',
            data: {
                voucher,
            },
        });
    }
    update(id, updateDiscountDto) {
        return `This action updates a #${id} discount`;
    }
    remove(id) {
        return `This action removes a #${id} discount`;
    }
};
exports.DiscountsService = DiscountsService;
exports.DiscountsService = DiscountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entity_discount_2.DiscountEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_used_discount_1.UsedDiscountEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DiscountsService);
//# sourceMappingURL=discounts.service.js.map