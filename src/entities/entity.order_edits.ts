import { OrderSubmissionEntity } from './entity.order_submissions';
/* eslint-disable prettier/prettier */
import { OrderEditStatus } from "src/lib";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrderEntity } from "./entity.order";
import { OrderEditPageEntity } from './entity.edit_page';


@Entity({ name: "order_edits" })
export class OrderEditEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: OrderEditStatus,
        default: OrderEditStatus.IN_PROGRESS
    })
    status: OrderEditStatus

    @CreateDateColumn()
    created_at: Date
    
    @CreateDateColumn()
    completed_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.order_edits)
    @JoinColumn()
    order: OrderEntity 
    
    @OneToMany(() => OrderSubmissionEntity, (submissions) => submissions.order_edit)
    submissions: OrderSubmissionEntity
    
    @OneToMany(() => OrderEditPageEntity, (pages) => pages.order_edit)
    pages: OrderEditPageEntity[]
}