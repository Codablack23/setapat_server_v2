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
    design_page?: number

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
    file_type: number

    @Column("text")
    file_extension: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.submissions)
    @JoinColumn()
    order: OrderEntity
} 