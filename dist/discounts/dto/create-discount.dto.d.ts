import { DiscountType } from 'src/entities/entity.discount';
export declare class CreateDiscountDto {
    type?: DiscountType;
    code: string;
    description?: string;
    duration_hours: number;
    is_one_time?: boolean;
    max_use?: number;
    amount?: number;
    min_order_amount?: number;
    max_discount_amount?: number;
    starts_at?: Date;
    expires_at?: Date;
    active_time?: string;
    active_days?: number[];
}
export declare class UpdateDiscountDto extends CreateDiscountDto {
    id: string;
}
export declare class ApplyDiscountDto {
    order_id: string;
}
