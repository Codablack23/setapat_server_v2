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
            messages: import("../entities/entity.messages").MessageEntity[];
        } | undefined;
    }>;
}
