"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const lib_1 = require("../lib");
const entity_conversations_1 = require("../entities/entity.conversations");
const entity_designer_1 = require("../entities/entity.designer");
const entity_edit_page_1 = require("../entities/entity.edit_page");
const entity_messages_1 = require("../entities/entity.messages");
const entity_notification_1 = require("../entities/entity.notification");
const entity_order_assignments_1 = require("../entities/entity.order_assignments");
const entity_order_edits_1 = require("../entities/entity.order_edits");
const entity_order_receipts_1 = require("../entities/entity.order_receipts");
const entity_order_reviews_1 = require("../entities/entity.order_reviews");
const entity_revisions_1 = require("../entities/entity.revisions");
let DesignerService = class DesignerService {
    orderRepo;
    orderAssignmentRepo;
    designerRepo;
    orderBriefAttachmentRepo;
    orderResizeExtraRepo;
    notificationRepo;
    orderSubmissionRepo;
    orderReviewRepo;
    orderReceiptRepo;
    orderEditRepo;
    orderEditPageRepo;
    conversationRepo;
    messageRepo;
    submissionRevisionRepo;
    constructor(orderRepo, orderAssignmentRepo, designerRepo, orderBriefAttachmentRepo, orderResizeExtraRepo, notificationRepo, orderSubmissionRepo, orderReviewRepo, orderReceiptRepo, orderEditRepo, orderEditPageRepo, conversationRepo, messageRepo, submissionRevisionRepo) {
        this.orderRepo = orderRepo;
        this.orderAssignmentRepo = orderAssignmentRepo;
        this.designerRepo = designerRepo;
        this.orderBriefAttachmentRepo = orderBriefAttachmentRepo;
        this.orderResizeExtraRepo = orderResizeExtraRepo;
        this.notificationRepo = notificationRepo;
        this.orderSubmissionRepo = orderSubmissionRepo;
        this.orderReviewRepo = orderReviewRepo;
        this.orderReceiptRepo = orderReceiptRepo;
        this.orderEditRepo = orderEditRepo;
        this.orderEditPageRepo = orderEditPageRepo;
        this.conversationRepo = conversationRepo;
        this.messageRepo = messageRepo;
        this.submissionRevisionRepo = submissionRevisionRepo;
    }
    sortOrders(orders) {
        return [...orders].sort((a, b) => {
            const aTime = a.last_edited_at?.getTime() ?? a.created_at.getTime();
            const bTime = b.last_edited_at?.getTime() ?? b.created_at.getTime();
            return bTime - aTime;
        });
    }
    async getOrders(userId, query) {
        const baseWhere = {
            order_assignments: {
                designer: { user: { id: userId } },
            },
        };
        let where = baseWhere;
        if (query === 'pending') {
            where = [
                {
                    ...baseWhere,
                    status: (0, typeorm_2.In)([
                        lib_1.OrderStatus.IN_PROGRESS,
                        lib_1.OrderStatus.PENDING,
                        lib_1.OrderStatus.EDIT,
                    ]),
                },
                {
                    ...baseWhere,
                    status: (0, typeorm_2.Not)(lib_1.OrderStatus.DRAFT),
                    order_edits: { status: lib_1.OrderEditStatus.IN_PROGRESS },
                },
            ];
        }
        else if (query === 'withdrawal') {
            where = [
                {
                    status: (0, typeorm_2.Not)(lib_1.OrderStatus.DRAFT),
                    order_assignments: {
                        ...baseWhere.order_assignments,
                        status: lib_1.OrderAssignmentStatus.WITHDRAWN,
                    },
                },
            ];
        }
        const ordersRes = await this.orderRepo.find({
            where,
            relations: {
                pages: {
                    page_resizes: true,
                },
                submissions: true,
                order_assignments: {
                    designer: { user: true },
                },
                order_edits: true,
            },
            order: { created_at: 'DESC' },
        });
        const orders = ordersRes.map((item) => {
            const activeEdit = item.order_edits.find((item) => item.status == lib_1.OrderEditStatus.IN_PROGRESS);
            const submissions = this.groupLatestSubmissionsByPage(item);
            return {
                ...item,
                submissions,
                status: activeEdit ? lib_1.OrderStatus.EDIT : item.status,
            };
        });
        return lib_1.AppResponse.getSuccessResponse({
            data: { orders: this.sortOrders(orders) },
            message: 'Orders retrieved successfully',
        });
    }
    async getOrder(userId, orderId) {
        const order = await this.orderRepo.findOne({
            where: {
                id: orderId,
                order_assignments: {
                    designer: { user: { id: userId } },
                },
            },
            relations: {
                order_assignments: {
                    designer: { user: true },
                },
                discount: { discount: true },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException({
                status: 'failed',
                message: 'Sorry, the order you are looking for does not exist or may have been deleted',
            });
        }
        const [pages, brief_attachments, submissions, conversations, order_edits, revisions, resize_extras,] = await Promise.all([
            this.orderRepo.manager
                .find(entities_1.OrderEntity, {
                where: { id: orderId },
                relations: ['pages', 'pages.page_resizes'],
            })
                .then((res) => res[0]?.pages ?? []),
            this.orderBriefAttachmentRepo.find({
                where: { order: { id: orderId } },
            }),
            this.orderSubmissionRepo.find({
                where: { order: { id: orderId } },
            }),
            this.conversationRepo.find({
                where: { order: { id: orderId } },
                relations: ['messages'],
                order: { created_at: 'DESC' },
            }),
            this.orderEditRepo.find({
                where: { order: { id: orderId } },
                relations: ['pages'],
            }),
            this.submissionRevisionRepo.find({
                where: { order: { id: orderId } },
            }),
            this.orderResizeExtraRepo.find({
                where: { order: { id: orderId } },
                relations: ['order_page', 'edit_page'],
            }),
        ]);
        const activeEdit = order_edits.find((item) => item.status === lib_1.OrderEditStatus.IN_PROGRESS);
        const conversation = conversations[0];
        const orderWithPages = { ...order, pages };
        const groupedSubmissions = this.groupLatestSubmissionsByPage({
            ...orderWithPages,
            submissions,
        });
        const latestSubmission = submissions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
        const responseData = {
            order: {
                ...order,
                pages,
                brief_attachments,
                submissions: groupedSubmissions,
                conversation,
                order_edits,
                revisions,
                resize_extras,
                active_edit: activeEdit,
                status: activeEdit ? lib_1.OrderStatus.EDIT : order.status,
                last_submitted_at: latestSubmission?.created_at,
            },
        };
        return lib_1.AppResponse.getSuccessResponse({
            data: responseData,
            message: 'Order retrieved successfully',
        });
    }
    groupLatestSubmissionsByPage(order) {
        let order_submissions = {};
        order.pages
            .sort((a, b) => a.page_number - b.page_number)
            .forEach((page) => {
            const allPageSubmissions = order.submissions.filter((item) => item.page == page.page_number);
            const pageOnlySubmissions = allPageSubmissions.filter((item) => item.page_type == lib_1.SubmissionPageType.PAGE);
            const resizeOnlySubmissions = allPageSubmissions.filter((item) => item.page_type == lib_1.SubmissionPageType.RESIZE && !!item.resize_page);
            lib_1.designExportFormats.forEach((format) => {
                const exportFormatSubmission = pageOnlySubmissions
                    .filter((s) => s.export_format === format)
                    .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
                const current = order_submissions[page.page_number.toString()] || {
                    formats: {},
                    resize: {},
                };
                order_submissions = {
                    ...order_submissions,
                    [page.page_number.toString()]: {
                        ...current,
                        formats: {
                            ...current.formats,
                            [format]: exportFormatSubmission.at(-1) ?? undefined,
                        },
                    },
                };
            });
            page.page_resizes
                .sort((a, b) => a.page - b.page)
                .forEach((resizePage) => {
                lib_1.designExportFormats.forEach((format) => {
                    const exportFormatSubmission = resizeOnlySubmissions
                        .filter((s) => s.export_format === format &&
                        s.resize_page == resizePage.page)
                        .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
                    const pageKey = page.page_number.toString();
                    const resizeKey = resizePage.page.toString();
                    const currentPage = order_submissions[pageKey] || {
                        formats: {},
                        resize: {},
                    };
                    const currentResize = currentPage.resize?.[resizeKey] || {
                        formats: {},
                    };
                    order_submissions = {
                        ...order_submissions,
                        [pageKey]: {
                            ...currentPage,
                            resize: {
                                ...currentPage.resize,
                                [resizeKey]: {
                                    ...currentResize,
                                    formats: {
                                        ...currentResize.formats,
                                        [format]: exportFormatSubmission.at(-1) ?? undefined,
                                    },
                                },
                            },
                        },
                    };
                });
            });
        });
        return order_submissions;
    }
};
exports.DesignerService = DesignerService;
exports.DesignerService = DesignerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entity_order_assignments_1.OrderAssignmentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entity_designer_1.DesignerProfileEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.OrderBriefAttachmentEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.OrderResizeExtraEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entity_notification_1.NotificationEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.OrderSubmissionEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(entity_order_reviews_1.OrderReviewEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(entity_order_receipts_1.OrderReceiptEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(entity_order_edits_1.OrderEditEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(entity_edit_page_1.OrderEditPageEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(entity_conversations_1.ConversationEntity)),
    __param(12, (0, typeorm_1.InjectRepository)(entity_messages_1.MessageEntity)),
    __param(13, (0, typeorm_1.InjectRepository)(entity_revisions_1.SubmissionRevisions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DesignerService);
//# sourceMappingURL=designer.service.js.map