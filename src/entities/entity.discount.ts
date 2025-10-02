import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UsedDiscountEntity } from './entity.used_discount';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
}

@Entity({ name: 'discounts' })
export class DiscountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
    default: DiscountType.PERCENTAGE,
  })
  type: DiscountType;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ type: 'longtext' })
  description: string;

  /** Duration in hours */
  @Column({
    type: 'int',
    transformer: {
      to(value: number) {
        return Math.round(value * 100);
      },
      from(value: number) {
        return value / 100;
      },
    },
  })
  duration_hours: number = 24;

  /** True if discount can only be used once */
  @Column({ type: 'boolean', default: false })
  is_one_time: boolean;

  /** True if discount can only be used once */
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  /** Maximum times discount can be used; null = unlimited */
  @Column({ type: 'int', nullable: true })
  max_use?: number;

  /** Discount amount: percentage (0–100) or flat value (currency) */
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 30 })
  amount: number;

  /** Optional minimum order total to apply this discount */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  min_order_amount?: number;

  /** Maximum discount amount for percentage discounts */
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_discount_amount?: number;

  /** Date after which discount expires */
  @Index()
  @Column({ type: 'timestamp', nullable: true })
  starts_at?: Date;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  expires_at?: Date;

  /** Date discount becomes active */
  @Column({ type: 'time', nullable: true })
  active_time?: string;

  /** Date discount becomes active */
  @Column({ type: 'json', nullable: true })
  active_days?: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UsedDiscountEntity, (usedDiscount) => usedDiscount.discount)
  used_discounts: UsedDiscountEntity[];
}
