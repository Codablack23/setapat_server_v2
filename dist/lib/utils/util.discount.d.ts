import { DiscountCycleType, DiscountEntity } from '../../entities/entity.discount';
import { CreateDiscountDto } from 'src/discounts/dto/create-discount.dto';
import { Repository } from 'typeorm';
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';
export declare class DiscountUtils {
    constructor();
    static validateDiscount(discount: DiscountEntity, totalUsed?: number, usedDiscounts?: UsedDiscountEntity[]): DiscountEntity;
    static getUsedDiscountsPerCycle(cycle?: DiscountCycleType, usedDiscounts?: UsedDiscountEntity[]): UsedDiscountEntity[];
    static getUsedDiscountsPerCycleAmount(cycle?: DiscountCycleType, usedDiscounts?: UsedDiscountEntity[]): number;
    static ensureFieldsForCreation(dto: CreateDiscountDto): CreateDiscountDto;
    static calculateDiscountAmount(discount: DiscountEntity, orderTotal: number): number;
    static getActiveEndTime(discount: DiscountEntity, referenceDate?: Date): Date | null;
    private static ensureWithinStartAndExpiry;
    private static ensureActiveDays;
    private static ensureActiveTime;
    private static ensureMinOrderAmount;
    private static ensureMaxUse;
}
export declare class DiscountInjectableUtils {
    private readonly discountRepo;
    constructor(discountRepo: Repository<DiscountEntity>);
    generateNextDiscountCode(): Promise<string>;
}
