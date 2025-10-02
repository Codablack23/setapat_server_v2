import { NotificationsService } from './notifications.service';
import type { AuthRequest } from 'src/lib';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            notifications: import("../entities/entity.notification").NotificationEntity[];
        } | undefined;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
}
