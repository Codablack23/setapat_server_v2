import { ConversationStatus, ConversationType } from "src/lib";
import { MessageEntity } from "./entity.messages";
import { OrderEntity } from "./entity.order";
import { ConversationParticipantEntity } from "./entity.participants";
export declare class ConversationEntity {
    id: string;
    conversation_type: ConversationType;
    status: ConversationStatus;
    messages: MessageEntity[];
    participants: ConversationParticipantEntity[];
    closed_at: Date;
    order?: OrderEntity;
    created_at: Date;
    updated_at: Date;
}
