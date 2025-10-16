import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { OrderEntity } from 'src/entities/entity.order';
import { DateTime } from 'luxon';
import { DesignPackage, OrderStatus, OrderType } from '../enum';

@Injectable()
export class OrdersUtil {
  private packageSlug: Record<DesignPackage, 'BS' | 'SD' | 'PM'> = {
    [DesignPackage.BASIC]: 'BS',
    [DesignPackage.STANDARD]: 'SD',
    [DesignPackage.PREMIUM]: 'PM',
  };

  private orderTypeSlug: Record<OrderType, 'CP' | 'OP'> = {
    [OrderType.ONE_OFF]: 'OP',
    [OrderType.CUSTOMIZED]: 'CP',
  };

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  private async getOrderIdDetails(condition?: object) {
    const orderCount = await this.orderRepository.count({ where: condition });
    const luxonDate = DateTime.now();

    const day = luxonDate.day.toString().padStart(2, '0');
    const month = luxonDate.month.toString().padStart(2, '0');
    const year = luxonDate.year.toString().slice(2);

    return { day, month, year, orderCount };
  }

  private addDigitPrefix(value: number): string {
    const str = value.toString();
    const minLength = 4; // 0001
    const targetLength = Math.max(minLength, Math.ceil(str.length / 3) * 3);
    return str.padStart(targetLength, '0');
  }

  async generateOrderNumber(
    designPackage: DesignPackage,
    orderType = OrderType.ONE_OFF,
    excludeDraft = false,
  ): Promise<string> {
    const condition = excludeDraft ? { status: Not(OrderStatus.DRAFT) } : {};
    const { orderCount, day, month, year } =
      await this.getOrderIdDetails(condition);

    const packageSlug = this.packageSlug[designPackage];
    const orderSlug = this.orderTypeSlug[orderType];
    const orderNumber = this.addDigitPrefix(orderCount + 1);

    const newOrderNumber = `SA${orderSlug}${packageSlug}${!excludeDraft ? 'DR' : ''}${day}${month}${year}${orderNumber}`;

    const existingOrder = await this.orderRepository.findOne({
      where: { order_id: newOrderNumber },
    });

    // 🧠 If order already exists, increment and retry once
    if (existingOrder) {
      return this.generateOrderNumber(designPackage, orderType, excludeDraft);
    }

    return newOrderNumber;
  }
}
