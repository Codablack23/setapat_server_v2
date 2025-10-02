/* eslint-disable prettier/prettier */
import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { OrderEntity } from "./entity.order";



@Entity({ name: "order_receipt" })
export class OrderReceiptEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date
    
    @CreateDateColumn()
    completed_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => OrderEntity, (order) => order.receipts)
    @JoinColumn()
    order: OrderEntity 
}