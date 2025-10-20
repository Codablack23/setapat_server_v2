import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubmissionPageType } from 'src/lib';
import { MessageEntity } from './entity.messages';

@Entity({ name: 'message_revisions' })
export class MessageRevisionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  revisions: number;

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

  @ManyToOne(() => MessageEntity, (message) => message.revisions)
  message: MessageEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
