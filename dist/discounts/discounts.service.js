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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entity_discount_1 = require("../entities/entity.discount");
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
        const voucher = util_discount_1.DiscountUtils.validateDiscount(discount, discount.used_discounts.length);
        const used_discount_amount = util_discount_1.DiscountUtils.getUsedDiscountsPerCycleAmount(voucher.cycle_type, discount.used_discounts);
        const used_discounts = util_discount_1.DiscountUtils.getUsedDiscountsPerCycle(discount.cycle_type, voucher.used_discounts);
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
                used_discounts: true,
            },
        });
        if (!discount) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Voucher does not exist'));
        }
        const voucher = util_discount_1.DiscountUtils.validateDiscount(discount, discount.used_discounts.length, discount.used_discounts);
        const usedVoucher = await this.usedDiscountRepo.findOne({
            where: {
                discount: {
                    id: discount.id,
                },
                orders: {
                    id: applyDiscountDto.order_id,
                },
            },
        });
        if (usedVoucher) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('This voucher has been used for this order'));
        }
        const order = await this.orderRepo.findOne({
            where: {
                id: applyDiscountDto.order_id,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        }
        const usedDiscount = this.usedDiscountRepo.create({
            discount,
            amount: order.amount,
        });
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
    __param(0, (0, typeorm_1.InjectRepository)(entity_discount_1.DiscountEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_used_discount_1.UsedDiscountEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DiscountsService);
//# sourceMappingURL=discounts.service.js.map