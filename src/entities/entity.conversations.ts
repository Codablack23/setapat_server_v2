/* eslint-disable prettier/prettier */
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
} from "typeorm";
import { ConversationStatus, ConversationType } from "src/lib";
import { MessageEntity } from "./entity.messages";
import { OrderEntity } from "./entity.order";
import { ConversationParticipantEntity } from "./entity.participants";


@Entity({ name: "conversations" })
export class ConversationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @Column({ type: "enum", enum: ConversationType, default: ConversationType.ORDER })
    conversation_type: ConversationType;

    @Index()
    @Column({ type: "enum", enum: ConversationStatus, default: ConversationStatus.OPEN })
    status: ConversationStatus;

    @OneToMany(() => MessageEntity, (message) => message.conversation, { cascade: true })
    messages: MessageEntity[];

    @OneToMany(() => ConversationParticipantEntity, (participant) => participant.conversation)
    participants: ConversationParticipantEntity[]

    @Column("datetime", { nullable: true })
    closed_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.conversations, { nullable: true })
    @JoinColumn()
    order?: OrderEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 