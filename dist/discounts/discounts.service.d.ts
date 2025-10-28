import { ApplyDiscountDto, CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DiscountEntity } from 'src/entities/entity.discount';
import { Repository } from 'typeorm';
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';
import { OrderEntity } from 'src/entities';
export declare class DiscountsService {
    private discountRepo;
    private usedDiscountRepo;
    private orderRepo;
    constructor(discountRepo: Repository<DiscountEntity>, usedDiscountRepo: Repository<UsedDiscountEntity>, orderRepo: Repository<OrderEntity>);
    create(createDiscountDto: CreateDiscountDto): string;
    findAll(): string;
    findOne(code: string): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            voucher: {
                used_discount_amount: number;
                used_discounts: UsedDiscountEntity[];
                id: string;
                type: import("src/entities/entity.discount").DiscountType;
                cycle_type: import("src/entities/entity.discount").DiscountCycleType;
                code: string;
                description: string;
                duration_hours: number;
                is_one_time: boolean;
                is_active: boolean;
                max_use?: number;
                amount: number;
                min_order_amount?: number;
                max_discount_amount?: number;
                starts_at?: Date;
                expires_at?: Date;
                active_time?: string;
                active_days?: number[];
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    applyDiscount(code: string, applyDiscountDto: ApplyDiscountDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            voucher: DiscountEntity;
        } | undefined;
    }>;
    update(id: number, updateDiscountDto: UpdateDiscountDto): string;
    remove(id: number): string;
}
