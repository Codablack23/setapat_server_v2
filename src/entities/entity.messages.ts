import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './entity.user';
import { ConversationEntity } from './entity.conversations';
import { MessageAttachmentEntity } from './entity.message_attachment';
import { OrderSubmissionEntity } from './entity.order_submissions';
import { MessageType } from 'src/lib';
import { MessageRevisionEntity } from './entity.message_revisions';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => ConversationEntity, (conversation) => conversation.messages)
  @JoinColumn()
  conversation: ConversationEntity;

  @Column('longtext', { nullable: true })
  content: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Column('boolean', { default: false })
  is_read: boolean;

  @Column('boolean', { default: false })
  is_delivered: boolean;

  @Index()
  @ManyToOne(() => UserEntity, (user) => user.sent_messages)
  @JoinColumn()
  sender: UserEntity;

  @OneToMany(() => MessageAttachmentEntity, (attachment) => attachment.message)
  attachments: MessageAttachmentEntity[];

  @OneToMany(() => OrderSubmissionEntity, (submission) => submission.message, {
    nullable: true,
  })
  order_submissions?: OrderSubmissionEntity[];

  @OneToMany(() => MessageRevisionEntity, (revision) => revision.message)
  revisions?: MessageRevisionEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
