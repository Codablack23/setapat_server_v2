/* eslint-disable prettier/prettier */
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { OrderEntity } from "./entity.order";
import { UserEntity } from "./entity.user";
import { NotificationTypes } from "src/lib/types/notifications.types";

@Entity({name:"notifications"})
export class NotificationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext")
    caption: string

    @Column("longtext")
    description: string

    @Column({type:"enum",enum:NotificationTypes})
    type:NotificationTypes

    @Column({type:"boolean",default:false})
    is_read:boolean

    @ManyToOne(()=>UserEntity,(user)=>user.notifications)
    @JoinColumn()
    user:UserEntity
    
    @ManyToOne(()=>OrderEntity,(order)=>order.notifications,{nullable:true})
    @JoinColumn()
    order?:OrderEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 