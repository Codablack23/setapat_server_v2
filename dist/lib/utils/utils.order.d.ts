import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entities/entity.order';
import { DesignPackage, OrderType } from '../enum';
export declare class OrdersUtil {
    private readonly orderRepository;
    private packageSlug;
    private orderTypeSlug;
    constructor(orderRepository: Repository<OrderEntity>);
    private getOrderIdDetails;
    private addDigitPrefix;
    generateOrderNumber(designPackage: DesignPackage, orderType?: OrderType, excludeDraft?: boolean): Promise<string>;
}
