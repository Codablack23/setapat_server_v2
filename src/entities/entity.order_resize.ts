/* eslint-disable prettier/prettier */
import { DesignUnits } from "src/lib";
import { 
    Column,
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
} from "typeorm";
import { OrderEntity } from "./entity.order";


@Entity({name:"order_resize_extras"})
export class OrderResizeExtraEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    design_type:string

    @Column({type:"enum",enum:DesignUnits})
    unit:DesignUnits

    @Column("int")
    design_page:number    
    
    @Column("bigint")
    amount:number

    @Column("int")
    page:number    
    
    @Column("int")
    width:number
    
    @Column("int")
    height:number

    @ManyToOne(()=>OrderEntity,(order)=>order.resize_extras)
    @JoinColumn()
    order:OrderEntity
} 