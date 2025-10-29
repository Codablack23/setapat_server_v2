import { DiscountsService } from './discounts.service';
import { ApplyDiscountDto, CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
export declare class DiscountsController {
    private readonly discountsService;
    constructor(discountsService: DiscountsService);
    create(createDiscountDto: CreateDiscountDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: {
                used_discount_amount: number;
                used_discounts: import("../entities/entity.used_discount").UsedDiscountEntity[];
                id: string;
                type: import("../entities/entity.discount").DiscountType;
                cycle_type: import("../entities/entity.discount").DiscountCycleType;
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
    update(id: string, updateDiscountDto: UpdateDiscountDto): string;
    appyDiscount(id: string, applyDiscountDto: ApplyDiscountDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            voucher: import("../entities/entity.discount").DiscountEntity;
        } | undefined;
    }>;
    remove(id: string): string;
}
