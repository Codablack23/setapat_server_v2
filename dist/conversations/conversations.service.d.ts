import { MessageEntity } from 'src/entities/entity.messages';
import { Repository } from 'typeorm';
import { ConversationEntity } from 'src/entities/entity.conversations';
import { MessageAttachmentEntity } from 'src/entities/entity.message_attachment';
import { MessageType, RevisionPerPage } from 'src/lib';
import { SendMessageDto } from './dto/create-conversation.dto';
import { UserEntity } from 'src/entities';
import { SocketGateway } from 'src/socket/socket.gateway';
import { ConversationParticipantEntity } from 'src/entities/entity.participants';
export declare class ConversationsService {
    private messageRepo;
    private conversationRepo;
    private messageAttachmentRepo;
    private participantRepo;
    private socketGateway;
    constructor(messageRepo: Repository<MessageEntity>, conversationRepo: Repository<ConversationEntity>, messageAttachmentRepo: Repository<MessageAttachmentEntity>, participantRepo: Repository<ConversationParticipantEntity>, socketGateway: SocketGateway);
    getMessages(userId: string, id: string): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            messages: (MessageEntity | {
                revisions: RevisionPerPage;
                id: string;
                conversation: ConversationEntity;
                content: string;
                type: MessageType;
                is_read: boolean;
                is_delivered: boolean;
                sender: UserEntity;
                attachments: MessageAttachmentEntity[];
                order_submissions?: import("src/entities").OrderSubmissionEntity[];
                created_at: Date;
                updated_at: Date;
            })[];
        } | undefined;
    }>;
    sendMessage(user: UserEntity, id: string, sendMessageDto: SendMessageDto): Promise<{
        status: "success" | "failed";
        message: string;
        data: {
            message: MessageEntity;
        } | undefined;
    }>;
}
