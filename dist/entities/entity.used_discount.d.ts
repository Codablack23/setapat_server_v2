import { DiscountEntity } from './entity.discount';
import { OrderEntity } from './entity.order';
export declare class UsedDiscountEntity {
    id: string;
    amount: number;
    discount: DiscountEntity;
    orders: OrderEntity[];
    created_at: Date;
    updated_at: Date;
}
