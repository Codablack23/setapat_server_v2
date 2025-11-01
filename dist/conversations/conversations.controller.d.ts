import { ConversationsService } from './conversations.service';
import { SendMessageDto } from './dto/create-conversation.dto';
import type { AuthRequest } from 'src/lib';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    create(id: string, req: AuthRequest, sendMessageDto: SendMessageDto): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            message: import("../entities/entity.messages").MessageEntity;
        } | undefined;
    }>;
    findAll(id: string, req: AuthRequest): Promise<{
        status: "failed" | "success";
        message: string;
        data: {
            messages: (import("../entities/entity.messages").MessageEntity | {
                order_edit: import("../entities/entity.order_edits").OrderEditEntity | undefined;
                revisions: import("src/lib").RevisionPerPage;
                id: string;
                conversation: import("../entities/entity.conversations").ConversationEntity;
                content: string;
                type: import("src/lib").MessageType;
                is_read: boolean;
                is_delivered: boolean;
                sender: import("../entities").UserEntity;
                attachments: import("../entities/entity.message_attachment").MessageAttachmentEntity[];
                order_submissions?: import("../entities").OrderSubmissionEntity[];
                created_at: Date;
                updated_at: Date;
            })[];
        } | undefined;
    }>;
}
