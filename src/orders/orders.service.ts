/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AppResponse, OrdersUtil, OrderType, SanitizerProvider } from 'src/lib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderPageEntity, OrderEntity, UserEntity } from 'src/entities';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderUtil: OrdersUtil,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderPageEntity)
    private readonly orderPageRepository: Repository<OrderPageEntity>,
  ) {}

  submit(arg0: number, dto: UpdateOrderDto) {
    throw new Error('Method not implemented.');
  }
  complete(arg0: number) {
    throw new Error('Method not implemented.');
  }
  makeConfidential(arg0: number) {
    throw new Error('Method not implemented.');
  }
  submitEdit(arg0: number, editId: number, data: UpdateOrderDto) {
    throw new Error('Method not implemented.');
  }
  completeEdit(arg0: number, editId: number) {
    throw new Error('Method not implemented.');
  }
  async create(createOrderDto: CreateOrderDto, user: UserEntity) {
    const order_id = await this.orderUtil.generateOrderNumber(
      createOrderDto.design_package,
    );

    const orderPages = createOrderDto.pages;

    const pages = await Promise.all(
      orderPages.map(async (page) => {
        const newPageInstance = this.orderPageRepository.create(page);
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
        order_id: id,
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

    if (!order)
      throw new NotFoundException({
        status: 'failed',
        message:
          'Sorry the order you are looking for does not exist or may have been deleted',
      });

    const response = AppResponse.getResponse('success', {
      data: {
        order,
      },
      message: 'orders retrieved successfully',
    });

    return response;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
