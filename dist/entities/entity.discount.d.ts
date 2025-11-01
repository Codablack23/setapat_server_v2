import { UsedDiscountEntity } from './entity.used_discount';
export declare enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    FLAT = "FLAT"
}
export declare enum DiscountCycleType {
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    YEARLY = "YEARLY",
    NONE = "NONE"
}
export declare class DiscountEntity {
    id: string;
    type: DiscountType;
    cycle_type: DiscountCycleType;
    allowed_user_email?: string[];
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
    used_discounts: UsedDiscountEntity[];
}
