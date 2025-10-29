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
exports.OrdersService = void 0;
const socket_gateway_1 = require("./../socket/socket.gateway");
const entity_messages_1 = require("../entities/entity.messages");
const entity_message_revisions_1 = require("../entities/entity.message_revisions");
const entity_conversations_1 = require("../entities/entity.conversations");
const common_1 = require("@nestjs/common");
const lib_1 = require("../lib");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const providers_1 = require("../providers");
const entity_notification_1 = require("../entities/entity.notification");
const notifications_types_1 = require("../lib/types/notifications.types");
const luxon_1 = require("luxon");
const entity_order_assignments_1 = require("../entities/entity.order_assignments");
const entity_designer_1 = require("../entities/entity.designer");
const config_1 = require("../config");
const entity_order_reviews_1 = require("../entities/entity.order_reviews");
const entity_order_receipts_1 = require("../entities/entity.order_receipts");
const entity_order_edits_1 = require("../entities/entity.order_edits");
const entity_edit_page_1 = require("../entities/entity.edit_page");
const entity_participants_1 = require("../entities/entity.participants");
const entity_revisions_1 = require("../entities/entity.revisions");
let OrdersService = class OrdersService {
    orderUtil;
    orderRepository;
    dataSource;
    orderPageRepository;
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
    participantsRepo;
    socketGateway;
    constructor(orderUtil, orderRepository, dataSource, orderPageRepository, orderAssignmentRepo, designerRepo, orderBriefAttachmentRepo, orderResizeExtraRepo, notificationRepo, orderSubmissionRepo, orderReviewRepo, orderReceiptRepo, orderEditRepo, orderEditPageRepo, conversationRepo, messageRepo, submissionRevisionRepo, participantsRepo, socketGateway) {
        this.orderUtil = orderUtil;
        this.orderRepository = orderRepository;
        this.dataSource = dataSource;
        this.orderPageRepository = orderPageRepository;
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
        this.participantsRepo = participantsRepo;
        this.socketGateway = socketGateway;
    }
    async reviewOrder(userId, id, dto) {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
            relations: {
                reviews: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        if (order.reviews.length > 0)
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('You have already added a review for this order'));
        const review = this.orderReviewRepo.create({
            ...dto,
            order,
        });
        await this.orderReviewRepo.save(review);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Review added successfully',
            data: {
                review: dto,
            },
        });
    }
    async getActiveEdit(userId, orderId) {
        const order = await this.orderRepository.findOne({
            where: {
                id: orderId,
                user: { id: userId },
            },
            relations: {
                order_edits: true,
                pages: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        }
        const activeEdits = order.order_edits.filter((edit) => edit.status === lib_1.OrderEditStatus.IN_PROGRESS);
        if (activeEdits.length > 0) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Sorry you can only make one edit at a time, please close out all pending edit before proceeding'));
        }
        return lib_1.AppResponse.getSuccessResponse({
            message: 'No active edit',
        });
    }
    async createOrderEdit(userId, orderId, dto) {
        const order = await this.orderRepository.findOne({
            where: {
                id: orderId,
                user: { id: userId },
            },
            relations: {
                order_edits: true,
                pages: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        }
        const activeEdits = order.order_edits.filter((edit) => edit.status === lib_1.OrderEditStatus.IN_PROGRESS);
        if (activeEdits.length > 0) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Sorry you can only make one edit at a time, please close out all pending edit before proceeding'));
        }
        const delivery_date = luxon_1.DateTime.now().plus({ hours: 4 });
        const amount = dto.pages.reduce((acc, item) => acc +
            item.price * (item.revisions ?? 1) +
            (item.page_resizes?.reduce((resizeAcc, resizeItem) => resizeAcc + resizeItem.amount, 0) ?? 0), 0);
        const orderEdit = this.orderEditRepo.create({
            order,
            delivery_date,
            amount,
        });
        const savedOrderEdit = await this.orderEditRepo.save(orderEdit);
        await Promise.all(dto.pages.map(async (editPage) => {
            const orderEditPage = this.orderEditPageRepo.create({
                page: editPage.page,
                revisions: editPage.revisions,
                price: editPage.price,
                order_edit: savedOrderEdit,
            });
            const newEditPage = await this.orderEditPageRepo.save(orderEditPage);
            const orderPage = order.pages.find((orderPage) => editPage.page === orderPage.page_number);
            if (editPage.page_resizes?.length) {
                const resizePages = editPage.page_resizes.map((pageResize) => this.orderResizeExtraRepo.create({
                    ...pageResize,
                    order_page: orderPage,
                    price: 1000,
                    order,
                    edit_page: newEditPage,
                }));
                await this.orderResizeExtraRepo.save(resizePages);
            }
        }));
        order.last_edited_at = new Date();
        order.order_edits = [orderEdit];
        await this.orderRepository.save(order);
        this.sendEditReceievedNotification(order.user, order).catch((err) => {
            console.error(`An error occured sending Notifications ${order.order_id}`);
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order edit created successfully',
            data: {},
        });
    }
    async submit(userId, id, dto) {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                order_assignments: {
                    status: lib_1.OrderAssignmentStatus.ACCEPTED,
                    designer: { user: { id: userId } },
                },
            },
            relations: {
                order_assignments: true,
                conversations: true,
                user: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        }
        if (order.status === lib_1.OrderStatus.COMPLETED) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Sorry, this order has already been completed'));
        }
        if (!order.conversations?.length) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('No conversation found for this order'));
        }
        const conversation = order.conversations[0];
        const designPlan = config_1.DESIGN_PLANS[order.design_package];
        const maxRevisionsPerPage = designPlan.revison + 1;
        const existingRevisions = await this.submissionRevisionRepo.find({
            where: { order: { id } },
        });
        dto.submissions.forEach((submission) => this.validateRevisionLimit(submission, existingRevisions, maxRevisionsPerPage, order.user, order));
        await this.dataSource.transaction(async (manager) => {
            const submissionRepo = manager.getRepository(entities_1.OrderSubmissionEntity);
            const messageRepo = manager.getRepository(entity_messages_1.MessageEntity);
            const revisionRepo = manager.getRepository(entity_revisions_1.SubmissionRevisions);
            const messageRevisionRepo = manager.getRepository(entity_message_revisions_1.MessageRevisionEntity);
            const submissions = submissionRepo.create(dto.submissions.map((s) => ({
                ...s,
                order,
                type: lib_1.SubmissionType.ORDER,
            })));
            const savedSubmissions = await submissionRepo.save(submissions);
            const message = this.createSubmissionMessages(savedSubmissions, existingRevisions, userId, conversation);
            const newMessage = await messageRepo.save(message);
            const newRevisions = this.createSubmissionRevisions(savedSubmissions);
            await revisionRepo.save(newRevisions);
            const messageRevisions = this.createMessageRevisions(newMessage, existingRevisions, savedSubmissions);
            await messageRevisionRepo.save(messageRevisions);
        });
        this.socketGateway.emitNewMessage(order.user.id);
        this.sendSubmissionNotification(order.user, order).catch((err) => console.error(`Failed to send submission notification for order ${order.order_id}`, err.stack));
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Submissions added successfully',
            data: { submission_count: dto.submissions.length },
        });
    }
    validateRevisionLimit(submission, revisions, maxRevisionsPerPage, user, order) {
        const isResize = submission.page_type == lib_1.SubmissionPageType.RESIZE;
        const pageRevisions = revisions.filter((item) => item.page_type == lib_1.SubmissionPageType.PAGE &&
            item.page == submission.page);
        const resizeRevisions = revisions.filter((item) => item.page_type == lib_1.SubmissionPageType.RESIZE &&
            item.page == submission.page &&
            item.resize_page == submission.resize_page);
        const count = isResize ? resizeRevisions.length : pageRevisions.length;
        console.log({ count });
        if (count >= maxRevisionsPerPage) {
            this.sendRevisionCountNotification(user, order).catch(() => {
                console.warn(`Revision limit notification failed for user ${user.id}`);
            });
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse(`Sorry, you have exhausted number of revisions for ${isResize
                ? `resize page (${submission.resize_page})`
                : `page (${submission.page})`}`));
        }
    }
    createSubmissionMessages(submissions, revisions, userId, conversation) {
        return this.messageRepo.create({
            content: '',
            sender: { id: userId },
            type: lib_1.MessageType.SUBMISSION,
            order_submissions: submissions,
            conversation,
        });
    }
    createMessageRevisions(message, revisions, submissions) {
        const messageRevisionsRepo = this.dataSource.getRepository(entity_message_revisions_1.MessageRevisionEntity);
        const pageRevisions = revisions.filter((r) => r.page_type == lib_1.SubmissionPageType.PAGE);
        const resizeRevisions = revisions.filter((r) => r.page_type == lib_1.SubmissionPageType.RESIZE);
        return submissions.map((submission) => {
            if (submission.page_type == lib_1.SubmissionPageType.PAGE) {
                const count = pageRevisions.filter((r) => r.page == submission.page);
                return messageRevisionsRepo.create({
                    revisions: count.length,
                    page_type: lib_1.SubmissionPageType.PAGE,
                    message,
                    page: submission.page,
                });
            }
            const count = resizeRevisions.filter((r) => r.page == submission.page && r.resize_page == submission.resize_page);
            return messageRevisionsRepo.create({
                revisions: count.length,
                page_type: lib_1.SubmissionPageType.RESIZE,
                page: submission.page,
                message,
                resize_page: submission.resize_page,
            });
        });
    }
    createSubmissionRevisions(submissions) {
        const revisionMap = new Map();
        for (const submission of submissions) {
            const key = submission.page_type === lib_1.SubmissionPageType.PAGE
                ? `PAGE:${submission.page}`
                : `RESIZE:${submission.page}:${submission.resize_page}`;
            if (!revisionMap.has(key)) {
                const revision = this.submissionRevisionRepo.create({
                    page_type: submission.page_type,
                    page: submission.page,
                    resize_page: submission.page_type === lib_1.SubmissionPageType.RESIZE
                        ? submission.resize_page
                        : undefined,
                    order: submission.order,
                });
                revisionMap.set(key, revision);
            }
        }
        return Array.from(revisionMap.values());
    }
    async complete(userId, id) {
        const order = await this.orderRepository.findOne({
            where: [
                {
                    status: lib_1.OrderStatus.PENDING,
                    id,
                    user: { id: userId },
                },
                {
                    status: lib_1.OrderStatus.PENDING,
                    id,
                    order_assignments: {
                        designer: {
                            user: {
                                id: userId,
                            },
                        },
                    },
                },
            ],
            relations: {
                user: true,
                order_assignments: {
                    designer: { user: true },
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order not found'));
        }
        const orderAssignment = order.order_assignments.find((oa) => oa.status === lib_1.OrderAssignmentStatus.ACCEPTED);
        order.status = lib_1.OrderStatus.COMPLETED;
        order.completed_at = luxon_1.DateTime.now().toJSDate();
        await this.orderRepository.save(order);
        Promise.all([
            this.sendCompletionNotification(order.user, order),
            orderAssignment
                ? this.sendCompletionNotification(orderAssignment.designer.user, order, lib_1.UserType.DESIGNER)
                : Promise.resolve(),
        ]).catch((err) => {
            console.log(`An error occurred while sending completion notifications ${order.order_id}`, err);
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order completed successfully',
            data: { order_id: order.order_id },
        });
    }
    async commenceOrder(userId, id) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (!order) {
            throw new common_1.UnauthorizedException(lib_1.AppResponse.getFailedResponse('Order not found'));
        }
        const designer = await this.designerRepo.findOne({
            where: { user: { id: userId } },
            relations: { user: true },
        });
        if (!designer) {
            throw new common_1.UnauthorizedException(lib_1.AppResponse.getFailedResponse('You are not authorized to proceed'));
        }
        const orderAssignment = await this.orderAssignmentRepo.findOne({
            where: {
                order: { id },
                designer: { id: designer.id },
            },
            relations: { order: { user: true } },
        });
        if (!orderAssignment) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Sorry it seems the order was not assigned to you'));
        }
        const participant = await this.participantsRepo.findOne({
            where: {
                user: { id: designer.user.id },
                conversation: { order: { id } },
                status: lib_1.ParticipantStatus.PENDING,
            },
        });
        if (participant) {
            participant.status = lib_1.ParticipantStatus.ACTIVE;
            participant.active_at = new Date();
            await this.participantsRepo.save(participant);
        }
        if (orderAssignment.status === lib_1.OrderAssignmentStatus.ACCEPTED) {
            throw new common_1.ConflictException(lib_1.AppResponse.getFailedResponse('You have already commenced this order'));
        }
        if (orderAssignment.status === lib_1.OrderAssignmentStatus.WITHDRAWN) {
            throw new common_1.ConflictException(lib_1.AppResponse.getFailedResponse('Sorry you can no longer proceed with this order, it has been reassigned'));
        }
        orderAssignment.status = lib_1.OrderAssignmentStatus.ACCEPTED;
        order.commenced_at = new Date();
        await this.orderAssignmentRepo.save(orderAssignment);
        await this.orderRepository.save(order);
        this.sendCommencementNotification(orderAssignment.order.user, orderAssignment.order).catch((err) => {
            console.error(`Failed to send assignment notification for order ${orderAssignment.order.order_id}:`, err);
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order commenced successfully',
        });
    }
    async makeConfidential(userId, id, dto) {
        console.log({ id, userId, dto });
        const order = await this.orderRepository.findOne({
            where: {
                id: id,
                status: lib_1.OrderStatus.DRAFT,
                user: {
                    id: userId,
                },
            },
            relations: {
                pages: true,
                brief_attachments: true,
                submissions: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order not found'));
        }
        order.confidential = dto.confidential ?? false;
        await this.orderRepository.save(order);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order updated successfully',
            data: {
                order: dto,
            },
        });
    }
    async submitEdit(userId, editId, editSubmissionDto) {
        const edit = await this.orderEditRepo.findOne({
            where: {
                status: lib_1.OrderEditStatus.IN_PROGRESS,
                id: editId,
                order: {
                    user: {
                        id: userId,
                    },
                },
            },
            relations: {
                order: {
                    user: true,
                },
            },
        });
        if (!edit)
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order Edit not found'));
        if ((edit.status = lib_1.OrderEditStatus.COMPLETED)) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('This Edit has already been completed'));
        }
        const orderSubmissions = await this.orderSubmissionRepo.find({
            where: { type: lib_1.SubmissionType.EDIT, order_edit: { id: editId } },
        });
        const editPages = edit.pages.reduce((acc, item) => {
            if (!acc[item.page]) {
                return {
                    ...acc,
                    [item.page]: item.revisions,
                };
            }
            return {
                ...acc,
            };
        }, {});
        editSubmissionDto.submissions.forEach((submission) => {
            if (submission.page_type == lib_1.SubmissionPageType.PAGE) {
                const revisions = (editPages[submission.page] ?? 1) + 1;
                const editSubmissions = orderSubmissions.filter((item) => item.page == submission.page);
                if (editSubmissions.length > revisions) {
                    throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('This edit has exhausted its total revision'));
                }
            }
            if (submission.page_type == lib_1.SubmissionPageType.RESIZE) {
                const revisions = (editPages[submission.page] ?? 1) + 1;
                const editSubmissions = orderSubmissions.filter((item) => item.resize_page == submission.resize_page);
                if (editSubmissions.length > revisions) {
                    throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('This edit resize has exhausted its total revision'));
                }
            }
        });
        const newSubmissions = editSubmissionDto.submissions.map((submission) => this.orderSubmissionRepo.create({
            ...submission,
            order: edit.order,
            order_edit: edit,
            type: lib_1.SubmissionType.EDIT,
        }));
        await this.orderSubmissionRepo.save(newSubmissions);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Edit Submissions added successfully',
            data: { submission_count: newSubmissions.length },
        });
    }
    async completeEdit(userId, editId) {
        const orderEdit = await this.orderEditRepo.findOne({
            where: {
                id: editId,
                order: {
                    user: {
                        id: userId,
                    },
                },
            },
        });
        if (!orderEdit) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order edit could not be found'));
        }
        if (orderEdit.status == lib_1.OrderEditStatus.COMPLETED) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Order edit has already been completed'));
        }
        orderEdit.status = lib_1.OrderEditStatus.COMPLETED;
        orderEdit.completed_at = new Date();
        await this.orderEditRepo.save(orderEdit);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order edit retrieved successfully',
            data: {
                order_edit_id: orderEdit.id,
            },
        });
    }
    async create(createOrderDto, user) {
        const order_id = await this.orderUtil.generateOrderNumber(createOrderDto.design_package);
        const orderPages = createOrderDto.pages;
        const pages = await Promise.all(orderPages.map(async (page) => {
            const newPageInstance = this.orderPageRepository.create({
                ...page,
                price: page.price,
            });
            return await this.orderPageRepository.save(newPageInstance);
        }));
        const newOrderInstance = this.orderRepository.create({
            order_id,
            ...createOrderDto,
            pages,
            user,
        });
        const newOrder = await this.orderRepository.save(newOrderInstance);
        const order = lib_1.SanitizerProvider.sanitizeObject(newOrder, ['user']);
        return lib_1.AppResponse.getResponse('success', {
            message: 'New Order created successfully',
            data: {
                order,
            },
        });
    }
    async sendAssignmentNotification(user, order) {
        const description = `Hi ${user.firstname}, an order has been assigned to you. View order to commence task.`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption: 'Order is Received!',
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: 'Order is Received!',
            html: `<p>${description}</p>`,
        });
    }
    async sendCommencementNotification(user, order) {
        const caption = 'Your order has commenced!';
        const description = `Hi ${user.firstname},  your order has commenced, stay active here while we interact and track progress`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption,
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
    }
    async sendNewOrderNotification(user, order) {
        const description = `Hi ${user.firstname}, your order has been received. View order to track progress. Thank you for choosing us!`;
        const caption = 'Order is Received!';
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption: 'Order is Received!',
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
        this.socketGateway.emitNewNotification(user.id, {
            caption,
            description,
        });
    }
    async sendRevisionCountNotification(user, order) {
        const caption = 'Order Revisions Are Used Up!';
        const description = `Hi ${user.firstname}, your order revisions are used up. Close and edit order to add more revisions.`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption,
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
        this.socketGateway.emitNewNotification(user.id, {
            caption,
            description,
        });
    }
    async sendSubmissionNotification(user, order) {
        const caption = 'Order Is Ready!';
        const description = `Hi ${user.firstname}, your order exports has been uploaded. View  Order and share feedback`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption,
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
        this.socketGateway.emitNewNotification(user.id, {
            caption,
            description,
        });
    }
    async sendEditReceievedNotification(user, order) {
        const caption = 'Order Edit/Revision Is Received!';
        const description = `Hi ${user.firstname}, your order(Edit/Revision) has been received. View order to track progress. Thank you for choosing us!`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption,
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
        this.socketGateway.emitNewNotification(user.id, {
            caption,
            description,
        });
    }
    async sendCompletionNotification(user, order, userType = lib_1.UserType.USER) {
        const caption = 'Order Is Completed!';
        const description = userType == lib_1.UserType.DESIGNER
            ? `Hi ${user.firstname}, your order has been completed. View order to see rating and feedback. `
            : `Hi ${user.firstname}, your order has been completed. View order and download exports. Thank you for choosing us, let's do this again.`;
        const newNotification = this.notificationRepo.create({
            user,
            type: notifications_types_1.NotificationTypes.ORDER,
            order,
            caption,
            description,
        });
        await this.notificationRepo.save(newNotification);
        await providers_1.MailerProvider.sendMail({
            to: user.email,
            subject: caption,
            html: `<p>${description}</p>`,
        });
        this.socketGateway.emitNewNotification(user.id, {
            caption,
            description,
        });
    }
    async findAll(user) {
        const ordersRes = await this.orderRepository.find({
            where: {
                user: {
                    id: user.id,
                },
            },
            relations: {
                order_edits: true,
                pages: {
                    page_resizes: true,
                },
                submissions: true,
                brief_attachments: true,
            },
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
        const response = lib_1.AppResponse.getResponse('success', {
            data: {
                orders,
            },
            message: 'orders retrieved successfully',
        });
        return response;
    }
    async findOne(id, userId) {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
            relations: {
                pages: {
                    page_resizes: true,
                },
                revisions: true,
                brief_attachments: true,
                order_assignments: true,
                order_edits: {
                    pages: true,
                },
                receipts: true,
                submissions: true,
                reviews: true,
                conversations: true,
                discount: {
                    discount: true,
                },
                resize_extras: {
                    order_page: true,
                    edit_page: true,
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException({
                status: 'failed',
                message: 'Sorry the order you are looking for does not exist or may have been deleted',
            });
        const activeEdit = order.order_edits.find((item) => item.status == lib_1.OrderEditStatus.IN_PROGRESS);
        const { conversations, ...orderDetails } = order;
        const conversation = conversations[0];
        const submissions = this.groupLatestSubmissionsByPage(order);
        const latestSubmission = order.submissions.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
        const response = lib_1.AppResponse.getResponse('success', {
            data: {
                order: {
                    ...orderDetails,
                    discount: orderDetails.discount?.discount,
                    conversation,
                    status: activeEdit ? lib_1.OrderStatus.EDIT : order.status,
                    active_edit: activeEdit,
                    last_submitted_at: latestSubmission[0]?.created_at,
                    submissions,
                },
            },
            message: 'orders retrieved successfully',
        });
        return response;
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
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    async generateReceipt(userId, id) {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
            relations: {
                receipts: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order could not be found'));
        if (order.receipts.length > 0)
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('Sorry you have already generate a receipt for this order'));
        const receipt = this.orderReceiptRepo.create({
            order,
        });
        await this.orderReceiptRepo.save(receipt);
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Receipt generated successfully',
        });
    }
    async completePayment(id, user) {
        const order = await this.orderRepository.findOne({
            where: {
                id,
                user: { id: user.id },
            },
            relations: {
                user: true,
                order_assignments: true,
                conversations: true,
            },
        });
        if (!order) {
            throw new common_1.BadRequestException(lib_1.AppResponse.getFailedResponse('Order not found'));
        }
        if (order.status !== lib_1.OrderStatus.DRAFT) {
            throw new common_1.ConflictException(lib_1.AppResponse.getFailedResponse('You can only complete this for a draft order'));
        }
        const designers = await this.designerRepo.find({
            where: { role: lib_1.DesignerRole.SUPER_DESIGNER },
            relations: { user: true },
        });
        if (!designers.length) {
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('No super designer available'));
        }
        const designer = designers[0];
        const pendingOrderId = await this.orderUtil.generateOrderNumber(order.design_package, order.type, true);
        const participants = [
            this.participantsRepo.create({
                user: order.user,
                status: lib_1.ParticipantStatus.ACTIVE,
            }),
            this.participantsRepo.create({
                user: designer.user,
                status: lib_1.ParticipantStatus.PENDING,
            }),
        ];
        const newParticipants = await this.participantsRepo.save(participants);
        const conversation = this.conversationRepo.create({
            conversation_type: lib_1.ConversationType.ORDER,
            order,
            participants: newParticipants,
        });
        const newConversation = await this.conversationRepo.save(conversation);
        const orderAssignment = this.orderAssignmentRepo.create({
            order,
            designer,
        });
        await this.orderAssignmentRepo.save(orderAssignment);
        order.status = lib_1.OrderStatus.PENDING;
        order.started_at = luxon_1.DateTime.now().toJSDate();
        order.order_id = pendingOrderId;
        order.order_assignments = [
            ...(order.order_assignments ?? []),
            orderAssignment,
        ];
        order.conversations = [...(order.conversations ?? []), newConversation];
        await this.orderRepository.save(order);
        Promise.all([
            this.sendNewOrderNotification(user, order),
            this.sendAssignmentNotification(designer.user, order),
        ]).catch((err) => {
            console.error(`An error occurred: could not send notification for ${order.order_id}`, err);
        });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order completed successfully',
            data: { order },
        });
    }
    async remove(id, userId) {
        const order = await this.orderRepository.findOne({
            where: { id, status: lib_1.OrderStatus.DRAFT, user: { id: userId } },
        });
        if (!order)
            throw new common_1.NotFoundException(lib_1.AppResponse.getFailedResponse('Order does not exist'));
        await this.orderRepository.delete({ id });
        return lib_1.AppResponse.getSuccessResponse({
            message: 'Order deleted successfully',
        });
    }
    async addDesignBrief(userId, id, addDesignBriefDto, ignoreBriefAttachmentCheck = false) {
        if (!ignoreBriefAttachmentCheck &&
            !addDesignBriefDto.design_brief &&
            (!addDesignBriefDto.brief_attachments ||
                addDesignBriefDto.brief_attachments.length === 0)) {
            throw new common_1.BadRequestException(lib_1.AppResponse.getFailedResponse('Either a design brief or at least one attachment is required.'));
        }
        const orderCheck = await this.orderRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['pages', 'pages.page_resizes', 'brief_attachments'],
        });
        if (!orderCheck)
            throw new common_1.BadRequestException(lib_1.AppResponse.getFailedResponse('Order does not exist'));
        if (orderCheck.status !== lib_1.OrderStatus.DRAFT) {
            throw new common_1.ForbiddenException(lib_1.AppResponse.getFailedResponse('This order can no longer be updated. Please create a new order or request an edit.'));
        }
        try {
            const result = await this.dataSource.transaction(async (manager) => {
                const orderRepo = manager.getRepository(entities_1.OrderEntity);
                const pageRepo = manager.getRepository(entities_1.OrderPageEntity);
                const resizeRepo = manager.getRepository(entities_1.OrderResizeExtraEntity);
                const attachmentRepo = manager.getRepository(entities_1.OrderBriefAttachmentEntity);
                const order = await orderRepo.findOne({
                    where: { id, user: { id: userId } },
                    relations: ['pages', 'pages.page_resizes', 'brief_attachments'],
                });
                if (!order)
                    throw new common_1.BadRequestException(lib_1.AppResponse.getFailedResponse('Order does not exist'));
                const pages = order.pages ?? [];
                for (const page of pages) {
                    const resizeExtrasForPage = addDesignBriefDto.resize_extras?.filter((item) => item.design_page === page.page_number) ?? [];
                    if (page.page_resizes?.length) {
                        await resizeRepo.remove(page.page_resizes);
                        page.page_resizes = [];
                    }
                    const newResizes = resizeExtrasForPage.map((item) => resizeRepo.create({
                        ...item,
                        price: item.price,
                        order,
                        order_page: page,
                    }));
                    if (newResizes.length > 0) {
                        page.page_resizes = await resizeRepo.save(newResizes);
                        await pageRepo.save(page);
                    }
                }
                if (order.brief_attachments?.length) {
                    await attachmentRepo.remove(order.brief_attachments);
                    order.brief_attachments = [];
                }
                const briefAttachments = addDesignBriefDto.brief_attachments?.length
                    ? await attachmentRepo.save(addDesignBriefDto.brief_attachments.map((item) => attachmentRepo.create(item)))
                    : [];
                order.brief_attachments = briefAttachments;
                order.design_brief = addDesignBriefDto.design_brief;
                order.design_assets = addDesignBriefDto.design_assets;
                order.design_preferences = addDesignBriefDto.design_preference ?? [];
                order.design_samples = addDesignBriefDto.design_samples;
                await orderRepo.save(order);
                return lib_1.AppResponse.getSuccessResponse({
                    message: 'Design brief added successfully',
                    data: { details: addDesignBriefDto },
                });
            });
            return result;
        }
        catch (err) {
            console.log(err);
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.InternalServerErrorException(lib_1.AppResponse.getFailedResponse('Failed to add design brief'));
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.OrderEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.OrderPageEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entity_order_assignments_1.OrderAssignmentEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entity_designer_1.DesignerProfileEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.OrderBriefAttachmentEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_1.OrderResizeExtraEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(entity_notification_1.NotificationEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(entities_1.OrderSubmissionEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(entity_order_reviews_1.OrderReviewEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(entity_order_receipts_1.OrderReceiptEntity)),
    __param(12, (0, typeorm_1.InjectRepository)(entity_order_edits_1.OrderEditEntity)),
    __param(13, (0, typeorm_1.InjectRepository)(entity_edit_page_1.OrderEditPageEntity)),
    __param(14, (0, typeorm_1.InjectRepository)(entity_conversations_1.ConversationEntity)),
    __param(15, (0, typeorm_1.InjectRepository)(entity_messages_1.MessageEntity)),
    __param(16, (0, typeorm_1.InjectRepository)(entity_revisions_1.SubmissionRevisions)),
    __param(17, (0, typeorm_1.InjectRepository)(entity_participants_1.ConversationParticipantEntity)),
    __metadata("design:paramtypes", [lib_1.OrdersUtil,
        typeorm_2.Repository,
        typeorm_2.DataSource,
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
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        socket_gateway_1.SocketGateway])
], OrdersService);
//# sourceMappingURL=orders.service.js.map