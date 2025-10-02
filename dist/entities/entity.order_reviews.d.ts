import { OrderEntity } from "./entity.order";
export declare class OrderReviewEntity {
    id: string;
    rating: number;
    comment?: string;
    created_at: Date;
    completed_at: Date;
    updated_at: Date;
    order: OrderEntity;
}
