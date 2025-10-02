import { DesignUnits, Orientation } from '../lib';
import { OrderEntity } from './entity.order';
import { OrderResizeExtraEntity } from './entity.order_resize';
export declare class OrderPageEntity {
    id: string;
    is_default: boolean;
    design_type: string;
    paper_size: string;
    paper_type: string;
    unit: DesignUnits;
    orientation: Orientation;
    page_number: number;
    price: number;
    width: number;
    height: number;
    order: OrderEntity;
    page_resizes: OrderResizeExtraEntity[];
    setOrientation(): void;
}
