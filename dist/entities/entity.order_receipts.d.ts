import { OrderEntity } from "./entity.order";
export declare class OrderReceiptEntity {
    id: string;
    created_at: Date;
    completed_at: Date;
    updated_at: Date;
    order: OrderEntity;
}
