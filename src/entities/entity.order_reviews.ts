/* eslint-disable prettier/prettier */
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



@Entity({ name: "order_reviews" })
export class OrderReviewEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "int"
    })
    rating: number
    
    @Column({
        type: "longtext",
        nullable:true
    })
    comment?: string

    @CreateDateColumn()
    created_at: Date
    
    @CreateDateColumn()
    completed_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.reviews)
    @JoinColumn()
    order: OrderEntity 
}