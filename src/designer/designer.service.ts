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

    const orders = await this.orderRepo.find({
      where,
      relations: {
        order_assignments: {
          designer: { user: true },
        },
        order_edits: true,
      },
      order: { created_at: 'DESC' },
    });

    return AppResponse.getSuccessResponse({
      data: { orders: this.sortOrders(orders) },
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

    return AppResponse.getSuccessResponse({
      data: {
        order: {
          ...orderDetails,
          conversation,
        },
      },
      message: 'Order retrieved successfully',
    });
  }
}
