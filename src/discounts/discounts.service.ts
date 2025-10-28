/* eslint-disable @typescript-eslint/no-unused-vars */
import {
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
import { UsedDiscountEntity } from 'src/entities/entity.used_discount';
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

    const voucher = DiscountUtils.validateDiscount(
      discount,
      discount.used_discounts.length,
    );

    const used_discount_amount = DiscountUtils.getUsedDiscountsPerCycleAmount(
      voucher.cycle_type,
      discount.used_discounts,
    );

    const used_discounts = DiscountUtils.getUsedDiscountsPerCycle(
      discount.cycle_type,
      voucher.used_discounts,
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

    const voucher = DiscountUtils.validateDiscount(
      discount,
      discount.used_discounts.length,
      discount.used_discounts,
    );

    const usedVoucher = await this.usedDiscountRepo.findOne({
      where: {
        discount: {
          id: discount.id,
        },
        orders: {
          id: applyDiscountDto.order_id,
        },
      },
    });

    if (usedVoucher) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'This voucher has been used for this order',
        ),
      );
    }

    const order = await this.orderRepo.findOne({
      where: {
        id: applyDiscountDto.order_id,
      },
    });

    if (!order) {
      throw new NotFoundException(
        AppResponse.getFailedResponse('Order could not be found'),
      );
    }

    const usedDiscount = this.usedDiscountRepo.create({
      discount,
      amount: order.amount,
    });

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
