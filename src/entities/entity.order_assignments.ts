import { OrderAssignmentStatus } from 'src/lib';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './entity.order';
import { DesignerProfileEntity } from './entity.designer';

@Entity('order_assignments')
export class OrderAssignmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderAssignmentStatus,
    default: OrderAssignmentStatus.PENDING,
  })
  status: OrderAssignmentStatus;

  @ManyToOne(() => OrderEntity, (order) => order.order_assignments)
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(
    () => DesignerProfileEntity,
    (designer) => designer.order_assignments,
  )
  @JoinColumn()
  designer: DesignerProfileEntity;

  @Column('datetime', { nullable: true })
  withdrawn_at?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
