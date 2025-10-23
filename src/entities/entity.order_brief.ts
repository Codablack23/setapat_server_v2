import { AttachmentTypes } from 'src/lib';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './entity.order';

@Entity('order_brief_attachments')
export class OrderBriefAttachmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AttachmentTypes,
  })
  type: AttachmentTypes;

  @Column({
    type: 'text',
    default: '',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    default: 'png',
    nullable: false,
  })
  extension: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'file_size',
  })
  file_size: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'audio_length',
  })
  audio_length?: number;

  @Column({
    type: 'text',
    nullable: false,
    name: 'file_url',
  })
  file_url: string;

  @ManyToOne(() => OrderEntity, (order) => order.brief_attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;
}
