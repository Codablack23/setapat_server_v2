import { DesignUnits } from 'src/lib';
import { OrderEntity } from './entity.order';
import { OrderEditPageEntity } from './entity.edit_page';
import { OrderPageEntity } from './entity.order_pages';
export declare class OrderResizeExtraEntity {
    id: string;
    design_type: string;
    unit: DesignUnits;
    page: number;
    price: number;
    width: number;
    height: number;
    order: OrderEntity;
    edit_page?: OrderEditPageEntity;
    order_page: OrderPageEntity;
    applyPriceTransform(): void;
}
