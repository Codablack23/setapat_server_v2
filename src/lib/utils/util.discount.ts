import { Injectable, BadRequestException } from '@nestjs/common';
import { DiscountEntity, DiscountType } from '../../entities/entity.discount';
import { AppResponse } from '../index'; // adjust path
import { CreateDiscountDto } from 'src/discounts/dto/create-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountUtils {
  constructor() {}

  /**
   * Validate discount (user-agnostic)
   * Throws BadRequestException with AppResponse if invalid
   */
  static validateDiscount(
    discount: DiscountEntity,
    totalUsed?: number,
  ): DiscountEntity {
    if (!discount.is_active) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount is not active'),
      );
    }

    const now = new Date();

    this.ensureWithinStartAndExpiry(discount, now);
    this.ensureActiveDays(discount, now);
    this.ensureActiveTime(discount, now);
    this.ensureMaxUse(discount, totalUsed);

    return discount;
  }

  /**
   * Ensure necessary field combinations are present for a discount
   * Only checks presence, not values
   */
  static ensureFieldsForCreation(dto: CreateDiscountDto) {
    const hasActiveDays = dto.active_days && dto.active_days.length > 0;
    const hasActiveTime = !!dto.active_time;
    const hasStartAt = !!dto.starts_at;
    const isOneTime = !!dto.is_one_time;

    // Infer category
    let category: 'CYCLE' | 'LONG_TERM' | 'ONE_TIME' | null = null;
    if (hasActiveDays || hasActiveTime) category = 'CYCLE';
    else if (hasStartAt) category = 'LONG_TERM';
    else if (isOneTime) category = 'ONE_TIME';

    if (!category) {
      throw new BadRequestException(
        AppResponse.getFailedResponse(
          'Discount must have at least one defining field (active_days, active_time, starts_at, or is_one_time)',
        ),
      );
    }

    // Required combos per category
    switch (category) {
      case 'CYCLE':
        if (!hasActiveDays) {
          throw new BadRequestException(
            AppResponse.getFailedResponse(
              'Cycle discount requires active_days',
            ),
          );
        }
        if (!hasActiveTime) {
          throw new BadRequestException(
            AppResponse.getFailedResponse(
              'Cycle discount requires active_time',
            ),
          );
        }
        break;

      case 'LONG_TERM':
        if (!hasStartAt || !dto.expires_at) {
          throw new BadRequestException(
            AppResponse.getFailedResponse(
              'Long-term discount requires both starts_at and expires_at',
            ),
          );
        }
        break;

      case 'ONE_TIME':
        dto.max_use = 1; // enforce automatically
        break;
    }

    // Ensure duration is present
    if (dto.duration_hours == null) {
      throw new BadRequestException(
        AppResponse.getFailedResponse(
          'Discount must have duration_hours defined',
        ),
      );
    }

    return dto;
  }

  /** Calculate discount amount based on type */
  static calculateDiscountAmount(
    discount: DiscountEntity,
    orderTotal: number,
  ): number {
    let discounted = 0;

    if (discount.type === DiscountType.PERCENTAGE) {
      discounted = orderTotal * (Number(discount.amount) / 100);
      if (discount.max_discount_amount) {
        discounted = Math.min(discounted, Number(discount.max_discount_amount));
      }
    } else {
      discounted = Number(discount.amount);
    }

    return discounted;
  }

  /** Compute the active end time based on active_time + duration_hours */
  static getActiveEndTime(
    discount: DiscountEntity,
    referenceDate = new Date(),
  ): Date | null {
    if (!discount.active_time) return null;

    const [h, m, s] = discount.active_time.split(':').map(Number);
    const start = new Date(referenceDate);
    start.setHours(h, m, s, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + Math.floor(discount.duration_hours));
    end.setMinutes(start.getMinutes() + (discount.duration_hours % 1) * 60);

    return end;
  }

  /** --- Helpers --- */
  private static ensureWithinStartAndExpiry(
    discount: DiscountEntity,
    now: Date,
  ) {
    if (discount.starts_at && now < discount.starts_at) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount has not started yet'),
      );
    }
    if (discount.expires_at && now > discount.expires_at) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount expired'),
      );
    }
  }

  private static ensureActiveDays(discount: DiscountEntity, now: Date) {
    if (discount.active_days && discount.active_days.length > 0) {
      const today = now.getDay();
      if (!discount.active_days.includes(today)) {
        throw new BadRequestException(
          AppResponse.getFailedResponse('Discount not active today'),
        );
      }
    }
  }

  private static ensureActiveTime(discount: DiscountEntity, now: Date) {
    if (!discount.active_time) return;

    const end = this.getActiveEndTime(discount, now);
    const [h, m, s] = discount.active_time.split(':').map(Number);
    const start = new Date(now);
    start.setHours(h, m, s, 0);

    if (now < start || (end && now > end)) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount not active at this time'),
      );
    }
  }

  private static ensureMinOrderAmount(
    discount: DiscountEntity,
    orderTotal: number,
  ) {
    if (
      discount.min_order_amount &&
      orderTotal < Number(discount.min_order_amount)
    ) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Order total too low for this discount'),
      );
    }
  }

  private static ensureMaxUse(discount: DiscountEntity, totalUsed?: number) {
    if (discount.max_use && totalUsed && totalUsed >= discount.max_use) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount has reached maximum usage'),
      );
    }
    if (discount.is_one_time && totalUsed && totalUsed >= 1) {
      throw new BadRequestException(
        AppResponse.getFailedResponse('Discount already used'),
      );
    }
  }
}

@Injectable()
export class DiscountInjectableUtils {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepo: Repository<DiscountEntity>,
  ) {}

  /**
   * Generate next discount code automatically
   * Format: SPYYYYXXX (e.g., SP2025001)
   */
  async generateNextDiscountCode(): Promise<string> {
    const year = new Date().getFullYear();

    const lastDiscount = await this.discountRepo
      .createQueryBuilder('discount')
      .where('discount.code LIKE :yearPrefix', { yearPrefix: `SP${year}%` })
      .orderBy('discount.created_at', 'DESC')
      .getOne();

    let nextNumber = 1;

    if (lastDiscount?.code) {
      const match = lastDiscount.code.match(new RegExp(`SP${year}(\\d+)$`));
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }

    const padded = String(nextNumber).padStart(3, '0');
    return `SP${year}${padded}`;
  }
}
