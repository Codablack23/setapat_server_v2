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
import { SubmissionRevisions } from './entity.revisions';


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
    
    @Column("int",{default:4})
    delivery_time:number = 4

    @Column({
        type: 'int',
        transformer: {
            to: (value: number) => Math.round(value * 100), // multiply by 100 before save
            from: (value: string) => Number(value) / 100,   // divide by 100 when reading
        },
    })
    amount: number
    
    @Column("datetime")
    delivery_date: Date
    
    @CreateDateColumn()
    completed_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.order_edits)
    @JoinColumn()
    order: OrderEntity 
    
    @OneToMany(() => OrderSubmissionEntity, (submissions) => submissions.order_edit)
    submissions: OrderSubmissionEntity
    
    @OneToMany(() => SubmissionRevisions, (revisions) => revisions.order_edit)
    revisions: SubmissionRevisions
    
    @OneToMany(() => OrderEditPageEntity, (pages) => pages.order_edit)
    pages: OrderEditPageEntity[]
}