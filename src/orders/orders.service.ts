import { MessageEntity } from './../entities/entity.messages';
import { ConversationEntity } from './../entities/entity.conversations';
import {
  AddDesignBriefDto,
  AddOrderSubmissionsDto,
  CreateOrderReviewDto,
  MakeOrderConfidentialDto,
} from './dto/update-order.dto';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  AppResponse,
  ConversationStatus,
  ConversationType,
  DesignerRole,
  MessageType,
  OrderAssignmentStatus,
  OrderEditStatus,
  OrderStatus,
  OrdersUtil,
  ParticipantStatus,
  SanitizerProvider,
  SubmissionPageType,
  SubmissionType,
  UserType,
} from 'src/lib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  OrderPageEntity,
  OrderEntity,
  UserEntity,
  OrderBriefAttachmentEntity,
  OrderSubmissionEntity,
  OrderResizeExtraEntity,
} from 'src/entities';
import { MailerProvider } from 'src/providers';
import { NotificationEntity } from 'src/entities/entity.notification';
import { NotificationTypes } from 'src/lib/types/notifications.types';
import { DateTime } from 'luxon';
import { OrderAssignmentEntity } from 'src/entities/entity.order_assignments';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { DESIGN_PLANS } from 'src/config';
import { OrderReviewEntity } from 'src/entities/entity.order_reviews';
import { OrderReceiptEntity } from 'src/entities/entity.order_receipts';
import { CreateOrderEditDto } from './dto/create-edit.dto';
import { OrderEditEntity } from 'src/entities/entity.order_edits';
import { OrderEditPageEntity } from 'src/entities/entity.edit_page';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderUtil: OrdersUtil,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderPageEntity)
    private readonly orderPageRepository: Repository<OrderPageEntity>,

    @InjectRepository(OrderAssignmentEntity)
    private readonly orderAssignmentRepo: Repository<OrderAssignmentEntity>,

    @InjectRepository(DesignerProfileEntity)
    private readonly designerRepo: Repository<DesignerProfileEntity>,

    @InjectRepository(OrderBriefAttachmentEntity)
    private readonly orderBriefAttachmentRepo: Repository<OrderBriefAttachmentEntity>,

    @InjectRepository(OrderResizeExtraEntity)
    private readonly orderResizeExtraRepo: Repository<OrderResizeExtraEntity>,

    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,

    @InjectRepository(OrderSubmissionEntity)
    private readonly orderSubmissionRepo: Repository<OrderSubmissionEntity>,

    @InjectRepository(OrderReviewEntity)
    private readonly orderReviewRepo: Repository<OrderReviewEntity>,

    @InjectRepository(OrderReceiptEntity)
    private readonly orderReceiptRepo: Repository<OrderReceiptEntity>,

    @InjectRepository(OrderEditEntity)
    private readonly orderEditRepo: Repository<OrderEditEntity>,

    @InjectRepository(OrderEditPageEntity)
    private readonly orderEditPageRepo: Repository<OrderEditPageEntity>,

    @InjectRepository(ConversationEntity)
    private readonly conversationRepo: Repository<ConversationEntity>,

    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,

    @InjectRepository(ConversationParticipantEntity)
    private readonly participantsRepo: Repository<ConversationParticipantEntity>,
  ) {}

  async reviewOrder(userId: string, id: string, dto: CreateOrderReviewDto) {
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    if (order.reviews.length > 0)
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'You have already added a  review for this order',
        ),
      );

    const review = this.orderReviewRepo.create({
      ...dto,
      order,
    });
    await this.orderReviewRepo.save(review);
    return AppResponse.getSuccessResponse({
      message: 'Review added successfully',
      data: {
        review: dto,
      },
    });
  }

  async createOrderEdit(
    userId: string,
    orderId: string,
    dto: CreateOrderEditDto,
  ) {
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    }

    const activeEdits = order.order_edits.filter(
      (edit) => edit.status === OrderEditStatus.IN_PROGRESS,
    );
    if (activeEdits.length > 0) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'Sorry you can only make one edit at a time, please close out all pending edit before proceeding',
        ),
      );
    }

    // Create the parent edit
    const orderEdit = this.orderEditRepo.create({ order });
    const savedOrderEdit = await this.orderEditRepo.save(orderEdit);

    // Create pages + resizes
    await Promise.all(
      dto.pages.map(async (editPage) => {
        const orderEditPage = this.orderEditPageRepo.create({
          page: editPage.page,
          revisions: editPage.revisions,
          order_edit: savedOrderEdit,
        });
        const newEditPage = await this.orderEditPageRepo.save(orderEditPage);

        const orderPage = order.pages.find(
          (orderPage) => editPage.page === orderPage.page_number,
        );

        if (editPage.page_resizes?.length) {
          const resizePages = editPage.page_resizes.map((pageResize) =>
            this.orderResizeExtraRepo.create({
              ...pageResize,
              order_page: orderPage,
              order,
              edit_page: newEditPage,
            }),
          );

          await this.orderResizeExtraRepo.save(resizePages);
        }
      }),
    );

    // Update last_edited_at
    order.last_edited_at = new Date();
    await this.orderRepository.save(order);

    this.sendEditReceievedNotification(order.user, order).catch((err) => {
      console.error(`An error occured sending Notifications ${order.order_id}`);
    });

    return AppResponse.getSuccessResponse({
      message: 'Order edit created successfully',
      data: {
        order_edit: savedOrderEdit.id,
      },
    });
  }

  async submit(userId: string, id: string, dto: AddOrderSubmissionsDto) {
    // Fetch the order assigned to this designer
    const order = await this.orderRepository.findOne({
      where: {
        id,
        order_assignments: {
          status: OrderAssignmentStatus.ACCEPTED,
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    }

    if (order.status === OrderStatus.COMPLETED) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'Sorry this order has already been completed',
        ),
      );
    }

    // Fetch existing submissions
    const orderSubmissions = await this.orderSubmissionRepo.find({
      where: { type: SubmissionType.ORDER, order: { id } },
    });

    const orderDesignPackage = DESIGN_PLANS[order.design_package];
    const maxRevisionsPerPage = orderDesignPackage.revison + 1; // 1 first submission + revisions

    // Count existing submissions by page and resize_page
    const pageCounts: Record<string, number> = {};
    const resizeCounts: Record<string, number> = {};

    for (const sub of orderSubmissions) {
      if (sub.page) pageCounts[sub.page] = (pageCounts[sub.page] || 0) + 1;
      if (sub.resize_page)
        resizeCounts[sub.resize_page] =
          (resizeCounts[sub.resize_page] || 0) + 1;
    }

    // Validate new submissions and increment counts for multiple submissions in same request
    dto.submissions.forEach((submission) => {
      if (submission.page_type === SubmissionPageType.PAGE) {
        const count = pageCounts[submission.page] || 0;
        if (count >= maxRevisionsPerPage) {
          throw new ForbiddenException(
            AppResponse.getFailedResponse(
              `Sorry, you have exhausted number of revisions for page (${submission.page})`,
            ),
          );
        }
        pageCounts[submission.page] = count + 1; // increment count
      }

      if (submission.page_type === SubmissionPageType.RESIZE) {
        const resizeKey = submission.resize_page ?? 1;
        const count = resizeCounts[resizeKey] || 0;
        if (count >= maxRevisionsPerPage) {
          throw new ForbiddenException(
            AppResponse.getFailedResponse(
              `Sorry, you have exhausted number of revisions for resize page (${resizeKey})`,
            ),
          );
        }
        resizeCounts[resizeKey] = count + 1; // increment count
      }
    });

    // Save new submissions
    const newSubmissions = dto.submissions.map((submission) =>
      this.orderSubmissionRepo.create({
        ...submission,
        order,
        type: SubmissionType.ORDER,
      }),
    );

    const conversation = order.conversations[0];

    const submissions = await this.orderSubmissionRepo.save(newSubmissions);
    const newMessage = this.messageRepo.create({
      content: '',
      sender: {
        id: userId,
      },
      type: MessageType.SUBMISSION,
      order_submissions: submissions,
      conversation: conversation,
    });

    await this.messageRepo.save(newMessage);

    // Send submission notification asynchronously (non-blocking)
    this.sendSubmissionNotification(order.user, order).catch((err) => {
      console.error(
        `Failed to send submission notification for order ${order.order_id}:`,
        err,
      );
    });

    return AppResponse.getSuccessResponse({
      message: 'Submissions added successfully',
      data: { submission_count: newSubmissions.length },
    });
  }

  async complete(userId: string, id: string) {
    // Find the order belonging to the user with PENDING status
    const order = await this.orderRepository.findOne({
      where: {
        status: OrderStatus.PENDING,
        id,
        user: { id: userId },
      },
      relations: {
        user: true,
        order_assignments: {
          designer: { user: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order not found'),
      );
    }

    // Get the accepted assignment from the relation
    const orderAssignment = order.order_assignments.find(
      (oa) => oa.status === OrderAssignmentStatus.ACCEPTED,
    );

    // Update order status and completed timestamp
    order.status = OrderStatus.COMPLETED;
    order.completed_at = DateTime.now().toJSDate(); // or new Date()

    // Save the order first
    await this.orderRepository.save(order);

    // Attempt to send notifications, but don’t block completion
    Promise.all([
      this.sendCompletionNotification(order.user, order),
      orderAssignment
        ? this.sendCompletionNotification(
            orderAssignment.designer.user,
            order,
            UserType.DESIGNER,
          )
        : Promise.resolve(), // no accepted assignment found
    ]).catch((err) => {
      console.log(
        `An error occurred while sending completion notifications ${order.order_id}`,
        err,
      );
    });

    // Return success response
    return AppResponse.getSuccessResponse({
      message: 'Order completed successfully',
      data: { order_id: order.order_id },
    });
  }

  async commenceOrder(userId: string, id: string) {
    const designer = await this.designerRepo.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!designer) {
      throw new UnauthorizedException(
        AppResponse.getFailedResponse('You are not authorized to proceed'),
      );
    }

    const orderAssignment = await this.orderAssignmentRepo.findOne({
      where: {
        order: { id },
        designer: { id: designer.id },
      },
      relations: { order: { user: true } },
    });

    if (!orderAssignment) {
      throw new NotFoundException(
        AppResponse.getFailedResponse(
          'Sorry it seems the order was not assigned to you',
        ),
      );
    }

    // Better: query participant directly
    const participant = await this.participantsRepo.findOne({
      where: {
        user: { id: designer.user.id },
        conversation: { order: { id } },
        status: ParticipantStatus.PENDING,
      },
    });

    if (participant) {
      participant.status = ParticipantStatus.ACTIVE;
      participant.active_at = new Date();
      await this.participantsRepo.save(participant); // await since it’s critical
    }

    if (orderAssignment.status === OrderAssignmentStatus.ACCEPTED) {
      throw new ConflictException(
        AppResponse.getFailedResponse('You have already commenced this order'),
      );
    }

    if (orderAssignment.status === OrderAssignmentStatus.WITHDRAWN) {
      throw new ConflictException(
        AppResponse.getFailedResponse(
          'Sorry you can no longer proceed with this order, it has been reassigned',
        ),
      );
    }

    orderAssignment.status = OrderAssignmentStatus.ACCEPTED;
    await this.orderAssignmentRepo.save(orderAssignment);

    this.sendCommencementNotification(
      orderAssignment.order.user,
      orderAssignment.order,
    ).catch((err) => {
      console.error(
        `Failed to send assignment notification for order ${orderAssignment.order.order_id}:`,
        err,
      );
    });

    return AppResponse.getSuccessResponse({
      message: 'Order commenced successfully',
    });
  }

  async makeConfidential(
    userId: string,
    id: string,
    dto: MakeOrderConfidentialDto,
  ) {
    console.log({ id, userId, dto });

    const order = await this.orderRepository.findOne({
      where: {
        id: id,
        status: OrderStatus.DRAFT,
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order not found'),
      );
    }

    order.confidential = dto.confidential ?? false;
    await this.orderRepository.save(order);
    return AppResponse.getSuccessResponse({
      message: 'Order updated successfully',
      data: {
        order: dto,
      },
    });
  }
  async submitEdit(
    userId: string,
    editId: string,
    editSubmissionDto: AddOrderSubmissionsDto,
  ) {
    const edit = await this.orderEditRepo.findOne({
      where: {
        status: OrderEditStatus.IN_PROGRESS,
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order Edit not found'),
      );

    if ((edit.status = OrderEditStatus.COMPLETED)) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse('This Edit has already been completed'),
      );
    }
    const orderSubmissions = await this.orderSubmissionRepo.find({
      where: { type: SubmissionType.EDIT, order_edit: { id: editId } },
    });

    const editPages = edit.pages.reduce(
      (acc, item) => {
        if (!acc[item.page]) {
          return {
            ...acc,
            [item.page]: item.revisions,
          };
        }
        return {
          ...acc,
        };
      },
      {} as Record<number, number>,
    );

    editSubmissionDto.submissions.forEach((submission) => {
      if (submission.page_type == SubmissionPageType.PAGE) {
        const revisions = (editPages[submission.page] ?? 1) + 1;
        const editSubmissions = orderSubmissions.filter(
          (item) => item.page == submission.page,
        );
        if (editSubmissions.length > revisions) {
          throw new ForbiddenException(
            AppResponse.getFailedResponse(
              'This edit has exhausted its total revision',
            ),
          );
        }
      }
      if (submission.page_type == SubmissionPageType.RESIZE) {
        const revisions = (editPages[submission.page] ?? 1) + 1;
        const editSubmissions = orderSubmissions.filter(
          (item) => item.resize_page == submission.resize_page,
        );
        if (editSubmissions.length > revisions) {
          throw new ForbiddenException(
            AppResponse.getFailedResponse(
              'This edit resize has exhausted its total revision',
            ),
          );
        }
      }
    });

    const newSubmissions = editSubmissionDto.submissions.map((submission) =>
      this.orderSubmissionRepo.create({
        ...submission,
        order: edit.order,
        order_edit: edit,
        type: SubmissionType.EDIT,
      }),
    );

    await this.orderSubmissionRepo.save(newSubmissions);

    return AppResponse.getSuccessResponse({
      message: 'Edit Submissions added successfully',
      data: { submission_count: newSubmissions.length },
    });
  }
  async completeEdit(userId: string, editId: string) {
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order edit could not be found'),
      );
    }
    if (orderEdit.status == OrderEditStatus.COMPLETED) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse('Order edit has already been completed'),
      );
    }

    orderEdit.status = OrderEditStatus.COMPLETED;
    orderEdit.completed_at = new Date();
    await this.orderEditRepo.save(orderEdit);

    return AppResponse.getSuccessResponse({
      message: 'Order edit retrieved successfully',
      data: {
        order_edit_id: orderEdit.id,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto, user: UserEntity) {
    const order_id = await this.orderUtil.generateOrderNumber(
      createOrderDto.design_package,
    );

    const orderPages = createOrderDto.pages;

    const pages = await Promise.all(
      orderPages.map(async (page) => {
        const newPageInstance = this.orderPageRepository.create({
          ...page,
          price: page.price,
        });
        return await this.orderPageRepository.save(newPageInstance);
      }),
    );

    const newOrderInstance = this.orderRepository.create({
      order_id,
      ...createOrderDto,
      pages,
      user,
    });

    const newOrder = await this.orderRepository.save(newOrderInstance);
    const order = SanitizerProvider.sanitizeObject(newOrder, ['user']);
    return AppResponse.getResponse('success', {
      message: 'New Order created successfully',
      data: {
        order,
      },
    });
  }

  private async sendAssignmentNotification(
    user: UserEntity,
    order: OrderEntity,
  ) {
    const description = `Hi ${user.firstname}, an order has been assigned to you. View order to commence task.`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption: 'Order is Received!',
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: 'Order is Received!',
      html: `<p>${description}</p>`,
    });
  }
  private async sendCommencementNotification(
    user: UserEntity,
    order: OrderEntity,
  ) {
    const caption = 'Your order has commenced!';
    const description = `Hi ${user.firstname},  your order has commenced, stay active here while we interact and track progress`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption,
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: caption,
      html: `<p>${description}</p>`,
    });
  }

  private async sendNewOrderNotification(user: UserEntity, order: OrderEntity) {
    const description = `Hi ${user.firstname}, your order has been received. View order to track progress. Thank you for choosing us!`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption: 'Order is Received!',
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: 'Order is Received!',
      html: `<p>${description}</p>`,
    });
  }
  private async sendRevisionCountNotification(
    user: UserEntity,
    order: OrderEntity,
  ) {
    const caption = 'Order Revisions Are Used Up!';
    const description = `Hi ${user.firstname}, your order revisions are used up. Close and edit order to add more revisions.`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption,
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: caption,
      html: `<p>${description}</p>`,
    });
  }
  private async sendSubmissionNotification(
    user: UserEntity,
    order: OrderEntity,
  ) {
    const caption = 'Order Is Ready!';
    const description = `Hi ${user.firstname}, your order exports has been uploaded. View  Order and share feedback`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption,
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: caption,
      html: `<p>${description}</p>`,
    });
  }

  private async sendEditReceievedNotification(
    user: UserEntity,
    order: OrderEntity,
  ) {
    const caption = 'Order Edit/Revision Is Received!';
    const description = `Hi ${user.firstname}, your order(Edit/Revision) has been received. View order to track progress. Thank you for choosing us!`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption,
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: caption,
      html: `<p>${description}</p>`,
    });
  }
  private async sendCompletionNotification(
    user: UserEntity,
    order: OrderEntity,
    userType: UserType = UserType.USER,
  ) {
    const caption = 'Order Is Completed!';
    const description =
      userType == UserType.DESIGNER
        ? `Hi ${user.firstname}, your order has been completed. View order to see rating and feedback. `
        : `Hi ${user.firstname}, your order has been completed. View order and download exports. Thank you for choosing us, let's do this again.`;

    const newNotification = this.notificationRepo.create({
      user,
      type: NotificationTypes.ORDER,
      order,
      caption,
      description,
    });

    await this.notificationRepo.save(newNotification);

    await MailerProvider.sendMail({
      to: user.email,
      subject: caption,
      html: `<p>${description}</p>`,
    });
  }

  async findAll(user: Partial<UserEntity>) {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        pages: true,
        brief_attachments: true,
      },
    });

    const response = AppResponse.getResponse('success', {
      data: {
        orders,
      },
      message: 'orders retrieved successfully',
    });

    return response;
  }

  async findOne(id: string, userId: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      relations: {
        pages: true,
        brief_attachments: true,
        submissions: true,
        conversations: true,
        discount: {
          discount: true,
        },
        resize_extras: {
          order_page: true,
        },
      },
    });

    if (!order)
      throw new NotFoundException({
        status: 'failed',
        message:
          'Sorry the order you are looking for does not exist or may have been deleted',
      });

    const now = DateTime.now();

    const { conversations, ...orderDetails } = order;

    const conversation = conversations[0];

    const response = AppResponse.getResponse('success', {
      data: {
        order: {
          ...orderDetails,
          discount: orderDetails.discount?.discount,
          conversation,
        },
      },
      message: 'orders retrieved successfully',
    });

    return response;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async generateReceipt(userId: string, id: string) {
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
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    if (order.receipts.length > 0)
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'Sorry you have already generate a receipt for this order',
        ),
      );
    const receipt = this.orderReceiptRepo.create({
      order,
    });
    await this.orderReceiptRepo.save(order);
    return AppResponse.getSuccessResponse({
      message: 'Receipt generated successfully',
    });
  }
  async completePayment(id: string, user: UserEntity) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
      relations: {
        user: true,
        order_assignments: true, // load existing assignments
        conversations: true, // load existing conversations
      },
    });

    if (!order) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Order not found'),
      );
    }

    if (order.status !== OrderStatus.DRAFT) {
      throw new ConflictException( // Conflict is better than Forbidden for this case
        AppResponse.getFailedResponse(
          'You can only complete this for a draft order',
        ),
      );
    }

    const designers = await this.designerRepo.find({
      where: { role: DesignerRole.SUPER_DESIGNER },
      relations: { user: true },
    });

    if (!designers.length) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('No super designer available'),
      );
    }

    const designer = designers[0];

    const pendingOrderId = await this.orderUtil.generateOrderNumber(
      order.design_package,
      order.type,
      true,
    );

    // ✅ Typo fixed (participants instead of particants)
    const participants = [
      this.participantsRepo.create({
        user: order.user,
        status: ParticipantStatus.ACTIVE,
      }),
      this.participantsRepo.create({
        user: designer.user,
        status: ParticipantStatus.PENDING,
      }),
    ];

    const newParticipants = await this.participantsRepo.save(participants);

    const conversation = this.conversationRepo.create({
      conversation_type: ConversationType.ORDER,
      order,
      participants: newParticipants,
    });

    const newConversation = await this.conversationRepo.save(conversation);

    const orderAssignment = this.orderAssignmentRepo.create({
      order,
      designer,
    });

    await this.orderAssignmentRepo.save(orderAssignment);

    // ✅ Keep existing assignments and conversations safe
    order.status = OrderStatus.PENDING;
    order.started_at = DateTime.now().toJSDate();
    order.order_id = pendingOrderId;
    order.order_assignments = [
      ...(order.order_assignments ?? []),
      orderAssignment,
    ];
    order.conversations = [...(order.conversations ?? []), newConversation];

    await this.orderRepository.save(order);

    // ✅ Fire-and-forget notifications (don’t block order completion)
    Promise.all([
      this.sendNewOrderNotification(user, order),
      this.sendAssignmentNotification(designer.user, order),
    ]).catch((err) => {
      console.error(
        `An error occurred: could not send notification for ${order.order_id}`,
        err,
      );
    });

    return AppResponse.getSuccessResponse({
      message: 'Order completed successfully',
      data: { order },
    });
  }

  async remove(id: string, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id, status: OrderStatus.DRAFT, user: { id: userId } },
    });
    if (!order)
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order does not exist'),
      );
    await this.orderRepository.delete({ id });
    return AppResponse.getSuccessResponse({
      message: 'Order deleted successfully',
    });
  }

  async addDesignBrief(
    userId: string,
    id: string,
    addDesignBriefDto: AddDesignBriefDto,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['pages'], // preload pages if you want them in memory
    });

    if (!order)
      throw new BadRequestException(
        AppResponse.getFailedResponse('Order does not exist'),
      );

    if (order.status !== OrderStatus.DRAFT) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'This order can no longer be updated. Please create a new order or request an edit.',
        ),
      );
    }

    // Fetch pages
    const pages = await this.orderPageRepository.find({
      where: { order: { id } },
      relations: ['page_resizes'], // so we can manage them cleanly
    });

    // Map resize extras by page
    for (const page of pages) {
      const resizes =
        addDesignBriefDto.resize_extras?.filter(
          (item) => item.design_page === page.page_number,
        ) ?? [];

      // Delete old resizes if you want a full replacement
      if (page.page_resizes?.length) {
        await this.orderResizeExtraRepo.remove(page.page_resizes);
      }

      const newResizes = resizes.map((item) =>
        this.orderResizeExtraRepo.create({
          ...item,
          price: item.price, // apply multiplier
          order,
          order_page: page, // ✅ important
        }),
      );

      // save all new ones at once
      const savedResizes = await this.orderResizeExtraRepo.save(newResizes);

      // attach back to page
      page.page_resizes = savedResizes;
      await this.orderPageRepository.save(page);
    }

    // Brief attachments
    const briefAttachments = addDesignBriefDto.brief_attachments
      ? await Promise.all(
          addDesignBriefDto.brief_attachments.map(async (item) => {
            const attachment = this.orderBriefAttachmentRepo.create(item);
            return await this.orderBriefAttachmentRepo.save(attachment);
          }),
        )
      : [];

    // Update main order
    order.brief_attachments = briefAttachments;
    order.design_brief = addDesignBriefDto.design_brief;
    order.design_assets = addDesignBriefDto.design_assets;
    order.design_preferences = addDesignBriefDto.design_preference;
    order.design_samples = addDesignBriefDto.design_samples;

    await this.orderRepository.save(order);

    return AppResponse.getSuccessResponse({
      message: 'Design brief added successfully',
      data: { details: addDesignBriefDto },
    });
  }
}
