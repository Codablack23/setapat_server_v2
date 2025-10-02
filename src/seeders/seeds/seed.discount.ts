import { DiscountEntity, DiscountType } from 'src/entities/entity.discount';

export const oneYear30PercentDiscountSeed: Partial<DiscountEntity> = {
  description: '30% discount valid for 1 year',
  type: DiscountType.PERCENTAGE,
  amount: 30,
  duration_hours: 24 * 365, // 1 year in hours
  is_one_time: false,
  is_active: true,
  starts_at: new Date(), // optional: now
};
