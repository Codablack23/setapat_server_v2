import { DesignUnits, Orientation } from 'src/lib';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { OrderEntity } from './entity.order';

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

  @Column({ type: 'bigint', nullable: false })
  width: number;

  @Column({ type: 'bigint', nullable: false })
  height: number;

  @ManyToOne(() => OrderEntity, (order) => order.pages)
  order: OrderEntity;

  // Automatically compute orientation before saving
  @BeforeInsert()
  @BeforeUpdate()
  setOrientation() {
    this.orientation =
      this.width >= this.height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
  }
}
