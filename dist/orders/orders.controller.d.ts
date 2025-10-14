import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddDesignBriefDto, AddOrderSubmissionsDto, CreateOrderReviewDto, MakeOrderConfidentialDto } from './dto/update-order.dto';
import { type AuthRequest } from 'src/lib';
import { CreateOrderEditDto } from './dto/create-edit.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order: Partial<import("../entities").OrderEntity>;
        } | undefined;
    }>;
    findAll(req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            orders: import("../entities").OrderEntity[];
        } | undefined;
    }>;
    findOne(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order: {
                discount: import("../entities/entity.discount").DiscountEntity | undefined;
                conversation: import("../entities/entity.conversations").ConversationEntity;
                revisions_per_page: import("src/lib").RevisionsPerPage;
                id: string;
                design_class: import("src/lib").DesignClass;
                order_id: string;
                design_brief: string;
                design_package: import("src/lib").DesignPackage;
                type: import("src/lib").OrderType;
                design_type: string;
                design_assets?: any;
                design_preferences?: any;
                design_samples?: any;
                status: import("src/lib").OrderStatus;
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
                submissions: import("../entities").OrderSubmissionEntity[];
                reviews: import("../entities/entity.order_reviews").OrderReviewEntity[];
                receipts: import("../entities/entity.order_receipts").OrderReceiptEntity[];
                notifications: import("../entities/entity.notification").NotificationEntity[];
                user: import("../entities").UserEntity;
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    submitOrder(req: AuthRequest, id: string, dto: AddOrderSubmissionsDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    completeOrder(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order_id: string;
        } | undefined;
    }>;
    addDesignBrief(id: string, designBriefDto: AddDesignBriefDto, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            details: AddDesignBriefDto;
        } | undefined;
    }>;
    completePayment(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order: import("../entities").OrderEntity;
        } | undefined;
    }>;
    commenceOrder(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: unknown;
    }>;
    generateReceipt(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: unknown;
    }>;
    addOrderReview(req: AuthRequest, id: string, dto: CreateOrderReviewDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            review: CreateOrderReviewDto;
        } | undefined;
    }>;
    makeOrderConfidential(req: AuthRequest, id: string, dto: MakeOrderConfidentialDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order: MakeOrderConfidentialDto;
        } | undefined;
    }>;
    createOrderEdit(id: string, dto: CreateOrderEditDto, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order_edit: string;
        } | undefined;
    }>;
    submitOrderEdit(id: string, dto: AddOrderSubmissionsDto, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    completeOrderEdit(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            order_edit_id: string;
        } | undefined;
    }>;
    remove(id: string, req: AuthRequest): Promise<{
        status: "success" | "failed";
        message: string;
        data: unknown;
    }>;
}
