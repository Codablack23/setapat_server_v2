/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
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
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
