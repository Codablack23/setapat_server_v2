import { UserEntity } from './entity.user';
import { ConversationEntity } from './entity.conversations';
import { MessageAttachmentEntity } from './entity.message_attachment';
import { OrderSubmissionEntity } from './entity.order_submissions';
import { MessageType } from 'src/lib';
export declare class MessageEntity {
    id: string;
    conversation: ConversationEntity;
    content: string;
    type: MessageType;
    is_read: boolean;
    is_delivered: boolean;
    sender: UserEntity;
    attachments: MessageAttachmentEntity[];
    order_submissions?: OrderSubmissionEntity[];
    created_at: Date;
    updated_at: Date;
}
