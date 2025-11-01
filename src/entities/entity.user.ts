/* eslint-disable prettier/prettier */
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BeforeUpdate,
    OneToMany,
    OneToOne
} from "typeorm";
import bcrypt from "bcrypt"
import { Gender, UserType } from "src/lib";
import { OrderEntity } from "./entity.order";
import { NotificationEntity } from "./entity.notification";
import { DesignerProfileEntity } from "./entity.designer";
import { MessageEntity } from "./entity.messages";
import { ConversationParticipantEntity } from "./entity.participants";
import { UsedDiscountEntity } from "./entity.used_discount";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext")
    firstname: string

    @Column("longtext")
    lastname: string

    @Column("longtext")
    email: string

    @Column({ type: "enum", enum: UserType, default: UserType.USER })
    user_type: UserType

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender: Gender

    @Column("longtext", { nullable: true })
    reason?: string

    @Column("longtext",)
    password: string

    @Column("longtext",)
    phone_number: string

    @Column("longtext", { nullable: true })
    avatar: string

    @Column("longtext", { nullable: true })
    telegram_handle?: string

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[]

    @OneToOne(() => DesignerProfileEntity, (designer) => designer.user)
    designer: DesignerProfileEntity

    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[]    
    
    @OneToMany(() => MessageEntity, (messages) => messages.sender)
    sent_messages: MessageEntity[] 
    
    @OneToMany(() => ConversationParticipantEntity, (participant) => participant.user)
    participants: ConversationParticipantEntity[]
    
    @OneToMany(() => UsedDiscountEntity, (discount) => discount.user)
    discounts: UsedDiscountEntity[]

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 