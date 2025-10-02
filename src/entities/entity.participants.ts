/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { ParticipantStatus } from "src/lib";
import { UserEntity } from "./entity.user";
import { ConversationEntity } from "./entity.conversations";


@Entity({ name: "conversation_participant" })
@Unique(["conversation", "user"])
export class ConversationParticipantEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ type: "enum", enum: ParticipantStatus, default: ParticipantStatus.ACTIVE })
    status: ParticipantStatus

    @Index()
    @ManyToOne(() => UserEntity, (user) => user.participants)
    @JoinColumn()
    user: UserEntity

    @Column("datetime", { nullable: true })
    active_at: Date 
    
    @Column("datetime", { nullable: true })
    inactive_at: Date
    
    @Index()
    @ManyToOne(() => ConversationEntity, (conversation) => conversation.participants)
    @JoinColumn()
    conversation: ConversationEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 

