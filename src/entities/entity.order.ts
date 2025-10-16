import { OrderReceiptEntity } from './entity.order_receipts';
/* eslint-disable prettier/prettier */
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { DesignClass, DesignPackage, OrderStatus, OrderType } from "src/lib";
import {designPlans} from "../lib/schema/"
import { OrderResizeExtraEntity } from "./entity.order_resize";
import { OrderBriefAttachmentEntity } from "./entity.order_brief";
import { OrderPageEntity } from "./entity.order_pages";
import { OrderSubmissionEntity } from "./entity.order_submissions";
import { UserEntity } from "./entity.user";
import { NotificationEntity } from "./entity.notification";
import { OrderAssignmentEntity } from "./entity.order_assignments";
import { OrderReviewEntity } from "./entity.order_reviews";
import { OrderEditEntity } from './entity.order_edits';
import { ConversationEntity } from './entity.conversations';
import { DateTime } from 'luxon';
import { UsedDiscountEntity } from './entity.used_discount';

@Entity({ name: "orders" })
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: DesignClass, default: DesignClass.A })
    design_class: DesignClass

    @Column("longtext")
    order_id: string 
    
    @Column("int", { default:2 })
    total_revisions: string

    @Column("longtext")
    design_brief: string

    @Column({ type: "enum", enum: DesignPackage, default: DesignPackage.BASIC })
    design_package: DesignPackage

    @Column({ type: "enum", enum: OrderType, default: OrderType.ONE_OFF })
    type: OrderType

    @Column("longtext")
    design_type: string

    @Column("json", { nullable: true })
    design_assets?: any

    @Column("json", { nullable: true })
    design_preferences?: any

    @Column("json", { nullable: true })
    design_samples?: any

    @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.DRAFT })
    status: OrderStatus

    @Column({
        type: 'bigint',
        transformer: {
            to: (value: number) => Math.round(value * 100), // multiply by 100 before save
            from: (value: string) => Number(value) / 100,   // divide by 100 when reading
        },
    })
    amount: number
    
    @Column({type: 'int',default:designPlans.BASIC.deliveryTime})
    delivery_time: number

    @Column("boolean", { default: false })
    confidential: boolean

    @Column("boolean", { default: false })
    quick_delivery: boolean

    @Column("timestamp", { nullable: true })
    delivery_date?: Date

    @Column("timestamp", { nullable: true })
    started_at?: Date

    @Column("timestamp", { nullable: true })
    commenced_at?: Date

    @Column("timestamp", { nullable: true })
    completed_at?: Date

    @Column("timestamp", { nullable: true })
    last_edited_at?: Date

    @OneToMany(() => OrderResizeExtraEntity, (resizeExtras) => resizeExtras.order,{cascade:true})
    resize_extras: OrderResizeExtraEntity[]

    @OneToMany(() => OrderEditEntity, (edits) => edits.order)
    order_edits: OrderEditEntity[]

    @OneToMany(() => OrderAssignmentEntity, (assignments) => assignments.order)
    order_assignments: OrderAssignmentEntity[]

    @OneToMany(() => OrderBriefAttachmentEntity, (briefAttachments) => briefAttachments.order,{cascade:true})
    brief_attachments: OrderBriefAttachmentEntity[]

    @OneToMany(() => OrderPageEntity, (pages) => pages.order,{cascade:true})
    pages: OrderPageEntity[]

    @OneToMany(() => OrderSubmissionEntity, (submissions) => submissions.order,{cascade:true})
    submissions: OrderSubmissionEntity[]

    @OneToMany(() => ConversationEntity, (conversations) => conversations.order,{cascade:true})
    conversations: ConversationEntity[]

    @OneToMany(() => OrderReviewEntity, (review) => review.order,{cascade:true})
    reviews: OrderReviewEntity[]

    @OneToMany(() => OrderReceiptEntity, (receipt) => receipt.order,{cascade:true})
    receipts: OrderReceiptEntity[]

    @OneToMany(() => NotificationEntity, (notification) => notification.order,{cascade:true})
    notifications: NotificationEntity[]

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn()
    user: UserEntity
    
    @ManyToOne(() => UsedDiscountEntity, (discount) => discount.orders,{nullable:true,onDelete:"SET NULL"})
    @JoinColumn()
    discount?: UsedDiscountEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @BeforeInsert()
    generateDeliveryDate(){
        if(!this.delivery_date){
            this.delivery_date = DateTime.now().plus({hours:this.delivery_time ?? 24}).toJSDate()
        }
    }
}