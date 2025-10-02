import { ParticipantStatus } from "src/lib";
import { UserEntity } from "./entity.user";
import { ConversationEntity } from "./entity.conversations";
export declare class ConversationParticipantEntity {
    id: string;
    status: ParticipantStatus;
    user: UserEntity;
    active_at: Date;
    inactive_at: Date;
    conversation: ConversationEntity;
    created_at: Date;
    updated_at: Date;
}
