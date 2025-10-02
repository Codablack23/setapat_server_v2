import { OrderEditEntity } from './entity.order_edits';
import { OrderResizeExtraEntity } from "./entity.order_resize";
export declare class OrderEditPageEntity {
    id: string;
    page: number;
    revisions: number;
    price: number;
    created_at: Date;
    completed_at: Date;
    updated_at: Date;
    order_edit: OrderEditEntity;
    page_resizes: OrderResizeExtraEntity[];
}
