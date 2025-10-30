import { DesignerService } from './designer.service';
import type { OrdersQuery } from './designer.service';
import type { AuthRequest } from 'src/lib';
export declare class DesignerController {
    private readonly designerService;
    constructor(designerService: DesignerService);
    getOrders(req: AuthRequest, status: OrdersQuery): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            orders: import("../entities").OrderEntity[];
        } | undefined;
    }>;
    updateProfile(): void;
    getConversations(req: AuthRequest, id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: {
                conversation: import("../entities/entity.conversations").ConversationEntity;
                submissions: import("src/lib").OrderSubmissions;
                active_edit: import("../entities/entity.order_edits").OrderEditEntity | undefined;
                status: import("src/lib").OrderStatus;
                last_submitted_at: Date;
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
                amount: number;
                delivery_time: number;
                confidential: boolean;
                quick_delivery: boolean;
                delivery_date?: Date;
                started_at?: Date;
                commenced_at?: Date;
                completed_at?: Date;
                last_edited_at?: Date;
                resize_extras: import("../entities").OrderResizeExtraEntity[];
                order_edits: import("../entities/entity.order_edits").OrderEditEntity[];
                order_assignments: import("../entities/entity.order_assignments").OrderAssignmentEntity[];
                brief_attachments: import("../entities").OrderBriefAttachmentEntity[];
                pages: import("../entities").OrderPageEntity[];
                reviews: import("../entities/entity.order_reviews").OrderReviewEntity[];
                receipts: import("../entities/entity.order_receipts").OrderReceiptEntity[];
                notifications: import("../entities/entity.notification").NotificationEntity[];
                revisions: import("../entities/entity.revisions").SubmissionRevisions[];
                user: import("../entities").UserEntity;
                discount?: import("../entities/entity.used_discount").UsedDiscountEntity;
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    getStats(): void;
    setupProfile(): void;
    applyForPromotion(): void;
}
