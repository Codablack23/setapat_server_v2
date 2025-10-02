import { OrderAssignmentStatus } from 'src/lib';
import { OrderEntity } from './entity.order';
import { DesignerProfileEntity } from './entity.designer';
export declare class OrderAssignmentEntity {
    id: string;
    status: OrderAssignmentStatus;
    order: OrderEntity;
    designer: DesignerProfileEntity;
    withdrawn_at?: string;
    created_at: Date;
    updated_at: Date;
}
