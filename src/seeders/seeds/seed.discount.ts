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

export const Amount63kDiscountSeed: Partial<DiscountEntity> = {
  description: '63,000 Credit Discount',
  type: DiscountType.FLAT,
  code: 'SAVCAM2910250002',
  amount: 63000,
  is_one_time: false,
  is_active: true,
  starts_at: new Date(), // optional: now
};
