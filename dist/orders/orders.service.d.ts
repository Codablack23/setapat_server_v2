import { MessageEntity } from 'src/entities/entity.messages';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { AddDesignBriefDto, AddOrderSubmissionsDto, CreateOrderReviewDto, MakeOrderConfidentialDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DesignPackage, OrderStatus, OrderSubmissions, OrdersUtil } from 'src/lib';
import { DataSource, Repository } from 'typeorm';
import { OrderPageEntity, OrderEntity, UserEntity, OrderBriefAttachmentEntity, OrderSubmissionEntity, OrderResizeExtraEntity } from 'src/entities';
import { NotificationEntity } from 'src/entities/entity.notification';
import { OrderAssignmentEntity } from 'src/entities/entity.order_assignments';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { OrderReviewEntity } from 'src/entities/entity.order_reviews';
import { OrderReceiptEntity } from 'src/entities/entity.order_receipts';
import { CreateOrderEditDto } from './dto/create-edit.dto';
import { OrderEditEntity } from 'src/entities/entity.order_edits';
import { OrderEditPageEntity } from 'src/entities/entity.edit_page';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';
import { SubmissionRevisions } from 'src/entities/entity.revisions';
export declare class OrdersService {
    private readonly orderUtil;
    private readonly orderRepository;
    private readonly dataSource;
    private readonly orderPageRepository;
    private readonly orderAssignmentRepo;
    private readonly designerRepo;
    private readonly orderBriefAttachmentRepo;
    private readonly orderResizeExtraRepo;
    private readonly notificationRepo;
    private readonly orderSubmissionRepo;
    private readonly orderReviewRepo;
    private readonly orderReceiptRepo;
    private readonly orderEditRepo;
    private readonly orderEditPageRepo;
    private readonly conversationRepo;
    private readonly messageRepo;
    private readonly submissionRevisionRepo;
    private readonly participantsRepo;
    constructor(orderUtil: OrdersUtil, orderRepository: Repository<OrderEntity>, dataSource: DataSource, orderPageRepository: Repository<OrderPageEntity>, orderAssignmentRepo: Repository<OrderAssignmentEntity>, designerRepo: Repository<DesignerProfileEntity>, orderBriefAttachmentRepo: Repository<OrderBriefAttachmentEntity>, orderResizeExtraRepo: Repository<OrderResizeExtraEntity>, notificationRepo: Repository<NotificationEntity>, orderSubmissionRepo: Repository<OrderSubmissionEntity>, orderReviewRepo: Repository<OrderReviewEntity>, orderReceiptRepo: Repository<OrderReceiptEntity>, orderEditRepo: Repository<OrderEditEntity>, orderEditPageRepo: Repository<OrderEditPageEntity>, conversationRepo: Repository<ConversationEntity>, messageRepo: Repository<MessageEntity>, submissionRevisionRepo: Repository<SubmissionRevisions>, participantsRepo: Repository<ConversationParticipantEntity>);
    reviewOrder(userId: string, id: string, dto: CreateOrderReviewDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            review: CreateOrderReviewDto;
        } | undefined;
    }>;
    createOrderEdit(userId: string, orderId: string, dto: CreateOrderEditDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order_edit: string;
        } | undefined;
    }>;
    submit(userId: string, id: string, dto: AddOrderSubmissionsDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    private validateRevisionLimit;
    private createSubmissionMessages;
    private createMessageRevisions;
    private createSubmissionRevisions;
    complete(userId: string, id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order_id: string;
        } | undefined;
    }>;
    commenceOrder(userId: string, id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    makeConfidential(userId: string, id: string, dto: MakeOrderConfidentialDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: MakeOrderConfidentialDto;
        } | undefined;
    }>;
    submitEdit(userId: string, editId: string, editSubmissionDto: AddOrderSubmissionsDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            submission_count: number;
        } | undefined;
    }>;
    completeEdit(userId: string, editId: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order_edit_id: string;
        } | undefined;
    }>;
    create(createOrderDto: CreateOrderDto, user: UserEntity): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: Partial<OrderEntity>;
        } | undefined;
    }>;
    private sendAssignmentNotification;
    private sendCommencementNotification;
    private sendNewOrderNotification;
    private sendRevisionCountNotification;
    private sendSubmissionNotification;
    private sendEditReceievedNotification;
    private sendCompletionNotification;
    findAll(user: Partial<UserEntity>): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            orders: {
                submissions: OrderSubmissions;
                id: string;
                design_class: import("src/lib").DesignClass;
                order_id: string;
                total_revisions: string;
                design_brief: string;
                design_package: DesignPackage;
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
                resize_extras: OrderResizeExtraEntity[];
                order_edits: OrderEditEntity[];
                order_assignments: OrderAssignmentEntity[];
                brief_attachments: OrderBriefAttachmentEntity[];
                pages: OrderPageEntity[];
                conversations: ConversationEntity[];
                reviews: OrderReviewEntity[];
                receipts: OrderReceiptEntity[];
                notifications: NotificationEntity[];
                revisions: SubmissionRevisions[];
                user: UserEntity;
                discount?: import("../entities/entity.used_discount").UsedDiscountEntity;
                created_at: Date;
                updated_at: Date;
            }[];
        } | undefined;
    }>;
    findOne(id: string, userId: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: {
                discount: import("../entities/entity.discount").DiscountEntity | undefined;
                conversation: ConversationEntity;
                submissions: OrderSubmissions;
                id: string;
                design_class: import("src/lib").DesignClass;
                order_id: string;
                total_revisions: string;
                design_brief: string;
                design_package: DesignPackage;
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
                resize_extras: OrderResizeExtraEntity[];
                order_edits: OrderEditEntity[];
                order_assignments: OrderAssignmentEntity[];
                brief_attachments: OrderBriefAttachmentEntity[];
                pages: OrderPageEntity[];
                reviews: OrderReviewEntity[];
                receipts: OrderReceiptEntity[];
                notifications: NotificationEntity[];
                revisions: SubmissionRevisions[];
                user: UserEntity;
                created_at: Date;
                updated_at: Date;
            };
        } | undefined;
    }>;
    private groupLatestSubmissionsByPage;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    generateReceipt(userId: string, id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    completePayment(id: string, user: UserEntity): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            order: OrderEntity;
        } | undefined;
    }>;
    remove(id: string, userId: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
    addDesignBrief(userId: string, id: string, addDesignBriefDto: AddDesignBriefDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: unknown;
    }>;
}
