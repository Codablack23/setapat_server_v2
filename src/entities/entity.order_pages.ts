import { DesignUnits, Orientation } from '../lib';
import { designPlans } from '../lib/schema';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { OrderEntity } from './entity.order';
import { OrderResizeExtraEntity } from './entity.order_resize';

@Entity('order_pages')
export class OrderPageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  is_default: boolean;

  @Column({ name: 'design_type', type: 'text', nullable: false })
  design_type: string;

  @Column({ name: 'paper_size', type: 'text', nullable: false })
  paper_size: string;

  @Column({ name: 'paper_type', type: 'text', nullable: false })
  paper_type: string;

  @Column({ type: 'enum', enum: DesignUnits, nullable: false })
  unit: DesignUnits;

  @Column({ type: 'enum', enum: Orientation, nullable: false })
  orientation: Orientation;

  @Column({ name: 'page_number', type: 'bigint', nullable: false })
  page_number: number;

  @Column({
    type: 'bigint',
    default: designPlans.BASIC.price.A * 100,
    transformer: {
      to: (value: number) => Math.round(value * 100), // multiply by 100 before save
      from: (value: string) => Number(value) / 100, // divide by 100 when reading
    },
  })
  price: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => Math.round(value * 100), // multiply by 100 before save
      from: (value: string) => Number(value) / 100, // divide by 100 when reading
    },
    nullable: false,
  })
  width: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => Math.round(value * 100), // multiply by 100 before save
      from: (value: string) => Number(value) / 100, // divide by 100 when reading
    },
    nullable: false,
  })
  height: number;

  @ManyToOne(() => OrderEntity, (order) => order.pages, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: OrderEntity;

  @OneToMany(() => OrderResizeExtraEntity, (resize) => resize.order_page, {
    cascade: true,
  })
  page_resizes: OrderResizeExtraEntity[];

  // Automatically compute orientation before saving
  @BeforeInsert()
  @BeforeUpdate()
  setOrientation() {
    this.orientation =
      this.width >= this.height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
  }
}
