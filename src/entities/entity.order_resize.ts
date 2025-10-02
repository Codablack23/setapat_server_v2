import { DesignUnits } from 'src/lib';
import { RESIZE_COST } from '../lib/schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './entity.order';
import { OrderEditPageEntity } from './entity.edit_page';
import { OrderPageEntity } from './entity.order_pages';

@Entity({ name: 'order_resize_extras' })
export class OrderResizeExtraEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  design_type: string;

  @Column({ type: 'enum', enum: DesignUnits })
  unit: DesignUnits;

  @Column('int')
  page: number;

  @Column('bigint', {
    transformer: {
      to: (value: number) => Math.round(value * 100), // multiply by 100 before save
      from: (value: string) => Number(value) / 100, // divide by 100 when reading
    },
    default: RESIZE_COST * 100,
  })
  price: number;

  @Column('int')
  width: number;

  @Column('int')
  height: number;

  @ManyToOne(() => OrderEntity, (order) => order.resize_extras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => OrderEditPageEntity, (page) => page.page_resizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  edit_page?: OrderEditPageEntity;

  @ManyToOne(() => OrderPageEntity, (page) => page.page_resizes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order_page: OrderPageEntity;
}
