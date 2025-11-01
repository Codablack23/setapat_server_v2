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
import { UserEntity } from './entity.user';

export enum UsedDisountStatus {
  PENDING = 'PENDING',
  USED = 'USED',
}

@Entity({ name: 'used_discounts' })
export class UsedDiscountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UsedDisountStatus,
    default: UsedDisountStatus.PENDING,
  })
  status: UsedDisountStatus;

  @Column({
    type: 'int',
    transformer: {
      from(value: number) {
        return value / 100;
      },
      to(value: number) {
        return value * 100;
      },
    },
    default: 3000,
  })
  amount: number;

  @ManyToOne(() => DiscountEntity, (discount) => discount.used_discounts)
  discount: DiscountEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.discount, { cascade: true })
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.discounts, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user?: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
