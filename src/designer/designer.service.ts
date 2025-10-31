/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import {
  OrderBriefAttachmentEntity,
  OrderEntity,
  OrderResizeExtraEntity,
  OrderSubmissionEntity,
} from 'src/entities';
import {
  AppResponse,
  OrderStatus,
  OrderEditStatus,
  OrderAssignmentStatus,
  OrderSubmissions,
  designExportFormats,
  SubmissionPageType,
} from 'src/lib';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { DesignerProfileEntity } from 'src/entities/entity.designer';
import { OrderEditPageEntity } from 'src/entities/entity.edit_page';
import { MessageEntity } from 'src/entities/entity.messages';
import { NotificationEntity } from 'src/entities/entity.notification';
import { OrderAssignmentEntity } from 'src/entities/entity.order_assignments';
import { OrderEditEntity } from 'src/entities/entity.order_edits';
import { OrderReceiptEntity } from 'src/entities/entity.order_receipts';
import { OrderReviewEntity } from 'src/entities/entity.order_reviews';
import { SubmissionRevisions } from 'src/entities/entity.revisions';

export type OrdersQuery = 'pending' | 'withdrawal';

@Injectable()
export class DesignerService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,

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

    @InjectRepository(SubmissionRevisions)
    private readonly submissionRevisionRepo: Repository<SubmissionRevisions>,
  ) {}

  private sortOrders(orders: OrderEntity[]) {
    return [...orders].sort((a, b) => {
      const aTime = a.last_edited_at?.getTime() ?? a.created_at.getTime();
      const bTime = b.last_edited_at?.getTime() ?? b.created_at.getTime();
      return bTime - aTime; // latest first
    });
  }

  async getOrders(userId: string, query?: OrdersQuery) {
    const baseWhere = {
      order_assignments: {
        designer: { user: { id: userId } },
      },
    };

    let where: any = baseWhere;

    if (query === 'pending') {
      where = [
        {
          ...baseWhere,
          status: In([
            OrderStatus.IN_PROGRESS,
            OrderStatus.PENDING,
            OrderStatus.EDIT,
          ]),
        },
        {
          ...baseWhere,
          status: Not(OrderStatus.DRAFT),
          order_edits: { status: OrderEditStatus.IN_PROGRESS },
        },
      ];
    } else if (query === 'withdrawal') {
      where = [
        {
          status: Not(OrderStatus.DRAFT),
          order_assignments: {
            ...baseWhere.order_assignments,
            status: OrderAssignmentStatus.WITHDRAWN,
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
      const activeEdit = item.order_edits.find(
        (item) => item.status == OrderEditStatus.IN_PROGRESS,
      );
      const submissions = this.groupLatestSubmissionsByPage(item);
      return {
        ...item,
        submissions,
        status: activeEdit ? OrderStatus.EDIT : item.status,
      };
    });

    return AppResponse.getSuccessResponse({
      data: { orders: this.sortOrders(orders as unknown as OrderEntity[]) },
      message: 'Orders retrieved successfully',
    });
  }
  async getOrder(userId: string, orderId: string) {
    // Step 1: Verify access & get base order info (without deep relations)
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
      throw new NotFoundException({
        status: 'failed',
        message:
          'Sorry, the order you are looking for does not exist or may have been deleted',
      });
    }

    // Step 2: Parallel lightweight fetches for related entities
    const [
      pages,
      brief_attachments,
      submissions,
      conversations,
      order_edits,
      revisions,
      resize_extras,
    ] = await Promise.all([
      this.orderRepo.manager
        .find(OrderEntity, {
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

    // Step 3: Process and structure data
    const activeEdit = order_edits.find(
      (item) => item.status === OrderEditStatus.IN_PROGRESS,
    );
    const conversation = conversations[0];
    const orderWithPages = { ...order, pages };
    const groupedSubmissions = this.groupLatestSubmissionsByPage({
      ...orderWithPages,
      submissions,
    } as OrderEntity);

    const latestSubmission = submissions.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    )[0];

    // Step 4: Construct final response object
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
        status: activeEdit ? OrderStatus.EDIT : order.status,
        last_submitted_at: latestSubmission?.created_at,
      },
    };

    return AppResponse.getSuccessResponse({
      data: responseData,
      message: 'Order retrieved successfully',
    });
  }

  private groupLatestSubmissionsByPage(order: OrderEntity) {
    let order_submissions: OrderSubmissions = {};

    order.pages
      .sort((a, b) => a.page_number - b.page_number)
      .forEach((page) => {
        const allPageSubmissions = order.submissions.filter(
          (item) => item.page == page.page_number,
        );

        const pageOnlySubmissions = allPageSubmissions.filter(
          (item) => item.page_type == SubmissionPageType.PAGE,
        );

        const resizeOnlySubmissions = allPageSubmissions.filter(
          (item) =>
            item.page_type == SubmissionPageType.RESIZE && !!item.resize_page,
        );

        // 🟦 Handle PAGE submissions
        designExportFormats.forEach((format) => {
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

        // 🟨 Handle RESIZE submissions
        page.page_resizes
          .sort((a, b) => a.page - b.page)
          .forEach((resizePage) => {
            designExportFormats.forEach((format) => {
              const exportFormatSubmission = resizeOnlySubmissions
                .filter(
                  (s) =>
                    s.export_format === format &&
                    s.resize_page == resizePage.page,
                )
                .sort(
                  (a, b) => a.created_at.getTime() - b.created_at.getTime(),
                );

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
}
