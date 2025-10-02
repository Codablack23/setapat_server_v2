import { NotificationEntity } from 'src/entities/entity.notification';
import { Repository } from 'typeorm';
export declare class NotificationsService {
    private notificationRepository;
    constructor(notificationRepository: Repository<NotificationEntity>);
    findAll(userId: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            notifications: NotificationEntity[];
        } | undefined;
    }>;
    remove(id: string, userId: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
}
