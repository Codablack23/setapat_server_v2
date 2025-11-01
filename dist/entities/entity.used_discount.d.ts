import { DiscountEntity } from './entity.discount';
import { OrderEntity } from './entity.order';
import { UserEntity } from './entity.user';
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
    user?: UserEntity;
    created_at: Date;
    updated_at: Date;
}
