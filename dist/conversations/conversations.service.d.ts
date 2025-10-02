import { MessageEntity } from 'src/entities/entity.messages';
import { Repository } from 'typeorm';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { MessageAttachmentEntity } from 'src/entities/entity.message_attachment';
import { SendMessageDto } from './dto/create-conversation.dto';
import { UserEntity } from 'src/entities';
export declare class ConversationsService {
    private messageRepo;
    private conversationRepo;
    private messageAttachmentRepo;
    constructor(messageRepo: Repository<MessageEntity>, conversationRepo: Repository<ConversationEntity>, messageAttachmentRepo: Repository<MessageAttachmentEntity>);
    getMessages(userId: string, id: string): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            messages: MessageEntity[];
        } | undefined;
    }>;
    sendMessage(user: UserEntity, id: string, sendMessageDto: SendMessageDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            message: MessageEntity;
        } | undefined;
    }>;
}
