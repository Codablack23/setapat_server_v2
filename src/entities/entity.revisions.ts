import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './entity.order';
import { SubmissionPageType, SubmissionType } from 'src/lib';
import { OrderEditEntity } from './entity.order_edits';

@Entity({ name: 'revisions_per_page' })
export class SubmissionRevisions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SubmissionType, default: SubmissionType.ORDER })
  type: SubmissionType;

  @Column({
    type: 'enum',
    enum: SubmissionPageType,
    default: SubmissionPageType.PAGE,
  })
  page_type: SubmissionPageType;

  @Column('int')
  page: number;

  @Column('int', { nullable: true })
  resize_page?: number;

  @ManyToOne(() => OrderEntity, (order) => order.revisions, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => OrderEditEntity, (edit) => edit.revisions, {
    onDelete: 'CASCADE',
  })
  order_edit: OrderEditEntity;
}
