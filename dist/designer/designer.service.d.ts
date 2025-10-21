import { Repository } from 'typeorm';
import { OrderEntity } from 'src/entities';
import { OrderStatus, OrderSubmissions } from 'src/lib';
export type OrdersQuery = 'pending' | 'withdrawal';
export declare class DesignerService {
    private readonly orderRepo;
    constructor(orderRepo: Repository<OrderEntity>);
    private sortOrders;
    getOrders(userId: string, query?: OrdersQuery): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            orders: OrderEntity[];
        } | undefined;
    }>;
    getOrder(userId: string, orderId: string): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order: {
                conversation: import("../entities/entity.conversations").ConversationEntity;
                submissions: OrderSubmissions;
                id: string;
                design_class: import("src/lib").DesignClass;
                order_id: string;
                total_revisions: string;
                design_brief: string;
                design_package: import("src/lib").DesignPackage;
                type: import("src/lib").OrderType;
                design_type: string;
                design_assets?: any;
                design_preferences?: any;
                design_samples?: any;
                status: OrderStatus;
                amount: number;
                delivery_time: number;
                confidential: boolean;
                quick_delivery: boolean;
                delivery_date?: Date;
                started_at?: Date;
                commenced_at?: Date;
                completed_at?: Date;
                last_edited_at?: Date;
                resize_extras: import("src/entities").OrderResizeExtraEntity[];
                order_edits: import("../entities/entity.order_edits").OrderEditEntity[];
                order_assignments: import("../entities/entity.order_assignments").OrderAssignmentEntity[];
                brief_attachments: import("src/entities").OrderBriefAttachmentEntity[];
                pages: import("src/entities").OrderPageEntity[];
                reviews: import("../entities/entity.order_reviews").OrderReviewEntity[];
                receipts: import("../entities/entity.order_receipts").OrderReceiptEntity[];
                notifications: import("../entities/entity.notification").NotificationEntity[];
                revisions: import("../entities/entity.revisions").SubmissionRevisions[];
                user: import("src/entities").UserEntity;
                discount?: import("../entities/entity.used_discount").UsedDiscountEntity;
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    private groupLatestSubmissionsByPage;
}
