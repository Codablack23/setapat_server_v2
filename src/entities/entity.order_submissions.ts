/* eslint-disable prettier/prettier */
import { AttachmentTypes, DesignExportFormats, SubmissionPageType, SubmissionType } from "src/lib";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrderEntity } from "./entity.order";
import { OrderEditEntity } from "./entity.order_edits";
import { MessageEntity } from "./entity.messages";


@Entity({ name: "order_submissions" })
export class OrderSubmissionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: SubmissionType,
        default: SubmissionType.ORDER
    })
    type: SubmissionType

    @Column({
        type: "enum",
        enum: SubmissionPageType,
        default: SubmissionPageType.PAGE
    })
    page_type: SubmissionPageType

    @Column("bigint", { nullable: true })
    resize_page?: number
    
    @Column("int", { default:0 })
    revisions: number

    @Column({ type: "enum", enum: DesignExportFormats })
    export_format: DesignExportFormats

    @Column("bigint")
    page: number

    @Column("longtext")
    file_url: string

    @Column("longtext")
    file_name: string

    @Column("bigint", { nullable: true })
    file_size: number

    @Column({ type: "enum", enum: AttachmentTypes })
    file_type: AttachmentTypes

    @Column("text")
    file_extension: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.submissions)
    @JoinColumn()
    order: OrderEntity
    
    @ManyToOne(() => MessageEntity, (message) => message.order_submissions)
    @JoinColumn()
    message: MessageEntity

    @ManyToOne(() => OrderEditEntity, (orderEdit) => orderEdit.submissions, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    order_edit?: OrderEditEntity
}