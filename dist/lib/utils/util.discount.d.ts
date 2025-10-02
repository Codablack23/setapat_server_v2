import { DiscountEntity } from '../../entities/entity.discount';
import { CreateDiscountDto } from 'src/discounts/dto/create-discount.dto';
import { Repository } from 'typeorm';
export declare class DiscountUtils {
    constructor();
    static validateDiscount(discount: DiscountEntity, totalUsed?: number): DiscountEntity;
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
