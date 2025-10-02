import { OrderEntity } from "./entity.order";
import { UserEntity } from "./entity.user";
import { NotificationTypes } from "src/lib/types/notifications.types";
export declare class NotificationEntity {
    id: string;
    caption: string;
    description: string;
    type: NotificationTypes;
    is_read: boolean;
    user: UserEntity;
    order?: OrderEntity;
    created_at: Date;
    updated_at: Date;
}
