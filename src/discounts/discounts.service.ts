/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplyDiscountDto, CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/entities/entity.discount';
import { Repository } from 'typeorm';
import { AppResponse } from 'src/lib';
import { DiscountUtils } from 'src/lib/utils/util.discount';
import {
  UsedDiscountEntity,
  UsedDisountStatus,
} from 'src/entities/entity.used_discount';
import { OrderEntity } from 'src/entities';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountEntity)
    private discountRepo: Repository<DiscountEntity>,

    @InjectRepository(UsedDiscountEntity)
    private usedDiscountRepo: Repository<UsedDiscountEntity>,

    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {}

  create(createDiscountDto: CreateDiscountDto) {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discounts`;
  }

  async findOne(code: string) {
    const discount = await this.discountRepo.findOne({
      where: {
        code,
      },
      relations: {
        used_discounts: true,
      },
    });
    if (!discount) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('Voucher Not Found!'),
      );
    }

    const usedDiscounts = discount.used_discounts.filter(
      (item) => item.status == UsedDisountStatus.USED,
    );

    const voucher = DiscountUtils.validateDiscount(
      discount,
      usedDiscounts.length,
    );

    const used_discount_amount = DiscountUtils.getUsedDiscountsPerCycleAmount(
      voucher.cycle_type,
      usedDiscounts,
    );

    const used_discounts = DiscountUtils.getUsedDiscountsPerCycle(
      discount.cycle_type,
      usedDiscounts,
    );

    return AppResponse.getSuccessResponse({
      message: 'voucher retrieved successfully',
      data: {
        voucher: {
          ...voucher,
          used_discount_amount,
          used_discounts,
        },
      },
    });
  }
  async applyDiscount(code: string, applyDiscountDto: ApplyDiscountDto) {
    const discount = await this.discountRepo.findOne({
      where: {
        code,
      },
      relations: {
        used_discounts: true,
      },
    });
    if (!discount) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('Voucher does not exist'),
      );
    }

    const usedDiscounts = discount.used_discounts.filter(
      (item) => item.status == UsedDisountStatus.USED,
    );

    const voucher = DiscountUtils.validateDiscount(
      discount,
      usedDiscounts.length,
      usedDiscounts,
    );

    const used_discount_amount = DiscountUtils.getUsedDiscountsPerCycleAmount(
      voucher.cycle_type,
      usedDiscounts,
    );

    const usableBalance = voucher.amount - used_discount_amount;

    const order = await this.orderRepo.findOne({
      where: {
        id: applyDiscountDto.order_id,
      },
      relations: {
        pages: true,
        resize_extras: true,
      },
    });

    if (!order) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    }

    const orderAmount = order.pages.reduce((acc, item) => acc + item.price, 0);
    const resizeAmount = order.resize_extras.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    const quickDeliveryAmount = order.quick_delivery ? orderAmount * 0.25 : 0;

    const amount = orderAmount + resizeAmount + quickDeliveryAmount;

    const usedDiscount = this.usedDiscountRepo.create({
      discount,
      amount: Math.min(amount, usableBalance),
    });

    console.log({
      amount,
      orderAmount,
      used_discount_amount,
    });

    if (usableBalance < 1) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('This is voucher has no usable balance'),
      );
    }

    const orderDiscount = await this.usedDiscountRepo.save(usedDiscount);
    order.discount = orderDiscount;
    await this.orderRepo.save(order);

    return AppResponse.getSuccessResponse({
      message: 'Voucher applied successfully',
      data: {
        voucher,
      },
    });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
