import { DiscountEntity } from './entity.discount';
import { OrderEntity } from './entity.order';
export declare enum UsedDisountStatus {
    PENDING = "PENDING",
    USED = "USED"
}
export declare class UsedDiscountEntity {
    id: string;
    status: UsedDisountStatus;
    amount: number;
    discount: DiscountEntity;
    orders: OrderEntity[];
    created_at: Date;
    updated_at: Date;
}
