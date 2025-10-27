/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { OrderEntity } from 'src/entities';
import {
  AppResponse,
  OrderStatus,
  OrderEditStatus,
  OrderAssignmentStatus,
  OrderSubmissions,
  designExportFormats,
  SubmissionPageType,
} from 'src/lib';

export type OrdersQuery = 'pending' | 'withdrawal';

@Injectable()
export class DesignerService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
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
      const submissions = this.groupLatestSubmissionsByPage(item);
      return {
        ...item,
        submissions,
      };
    });

    return AppResponse.getSuccessResponse({
      data: { orders: this.sortOrders(orders as unknown as OrderEntity[]) },
      message: 'Orders retrieved successfully',
    });
  }
  async getOrder(userId: string, orderId: string) {
    const order = await this.orderRepo.findOne({
      where: {
        id: orderId,
        order_assignments: {
          designer: {
            user: {
              id: userId,
            },
          },
        },
      },
      relations: {
        pages: {
          page_resizes: true,
        },
        brief_attachments: true,
        submissions: true,
        conversations: true,
        order_edits: {
          pages: true,
        },
        revisions: true,
        order_assignments: {
          designer: {
            user: true,
          },
        },
        discount: {
          discount: true,
        },
        resize_extras: {
          order_page: true,
        },
      },
      order: { created_at: 'DESC' },
    });

    if (!order)
      throw new NotFoundException({
        status: 'failed',
        message:
          'Sorry the order you are looking for does not exist or may have been deleted',
      });

    const { conversations, ...orderDetails } = order;
    const conversation = conversations[0];
    const submissions = this.groupLatestSubmissionsByPage(order);

    return AppResponse.getSuccessResponse({
      data: {
        order: {
          ...orderDetails,
          conversation,
          submissions,
        },
      },
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
