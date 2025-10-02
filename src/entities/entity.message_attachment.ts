import { AttachmentTypes } from 'src/lib';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageEntity } from './entity.messages';

@Entity('message_attachments')
export class MessageAttachmentEntity {
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

  @ManyToOne(() => MessageEntity, (message) => message.attachments)
  @JoinColumn()
  message: MessageEntity;
}
