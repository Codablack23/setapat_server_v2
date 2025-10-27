import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddDesignBriefDto, AddOrderSubmissionsDto, CreateOrderReviewDto, MakeOrderConfidentialDto } from './dto/update-order.dto';
import { type AuthRequest } from 'src/lib';
import { CreateOrderEditDto } from './dto/create-edit.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: Partial<import("../entities").OrderEntity>;
        } | undefined;
    }>;
    findAll(req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            orders: {
                submissions: import("src/lib").OrderSubmissions;
                status: import("src/lib").OrderStatus;
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
                conversations: import("../entities/entity.conversations").ConversationEntity[];
                reviews: import("../entities/entity.order_reviews").OrderReviewEntity[];
                receipts: import("../entities/entity.order_receipts").OrderReceiptEntity[];
                notifications: import("../entities/entity.notification").NotificationEntity[];
                revisions: import("../entities/entity.revisions").SubmissionRevisions[];
                user: import("../entities").UserEntity;
                discount?: import("../entities/entity.used_discount").UsedDiscountEntity;
                created_at: Date;
                updated_at: Date;
            }[];
        } | undefined;
    }>;
    findOne(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: {
                discount: import("../entities/entity.discount").DiscountEntity | undefined;
                conversation: import("../entities/entity.conversations").ConversationEntity;
                status: import("src/lib").OrderStatus;
                active_edit: import("../entities/entity.order_edits").OrderEditEntity | undefined;
                submissions: import("src/lib").OrderSubmissions;
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
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    submitOrder(req: AuthRequest, id: string, dto: AddOrderSubmissionsDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    completeOrder(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order_id: string;
        } | undefined;
    }>;
    addDesignBrief(id: string, designBriefDto: AddDesignBriefDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    updateDesignBrief(id: string, designBriefDto: AddDesignBriefDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    completePayment(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: import("../entities").OrderEntity;
        } | undefined;
    }>;
    commenceOrder(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    generateReceipt(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    addOrderReview(req: AuthRequest, id: string, dto: CreateOrderReviewDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            review: CreateOrderReviewDto;
        } | undefined;
    }>;
    makeOrderConfidential(req: AuthRequest, id: string, dto: MakeOrderConfidentialDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: MakeOrderConfidentialDto;
        } | undefined;
    }>;
    getOrderEditStatus(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    createOrderEdit(id: string, dto: CreateOrderEditDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {} | undefined;
    }>;
    submitOrderEdit(id: string, dto: AddOrderSubmissionsDto, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    completeOrderEdit(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order_edit_id: string;
        } | undefined;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
}
