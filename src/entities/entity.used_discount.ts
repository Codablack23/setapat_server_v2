import {
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DiscountEntity } from './entity.discount';
import { OrderEntity } from './entity.order';

@Entity({ name: 'used_discounts' })
export class UsedDiscountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    transformer: {
      from(value: number) {
        return value * 100;
      },
      to(value: number) {
        return value / 100;
      },
    },
    default: 3000,
  })
  amount: number;

  @ManyToOne(() => DiscountEntity, (discount) => discount.used_discounts)
  discount: DiscountEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.discount, { cascade: true })
  orders: OrderEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
