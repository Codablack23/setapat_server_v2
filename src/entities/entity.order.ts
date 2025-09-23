/* eslint-disable prettier/prettier */
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
import { DesignClass, DesignPackage, OrderStatus, OrderType } from "src/lib";
import { OrderResizeExtraEntity } from "./entity.order_resize";
import { OrderBriefAttachmentEntity } from "./entity.order_brief";
import { OrderPageEntity } from "./entity.order_pages";
import { OrderSubmissionEntity } from "./entity.order_submissions";
import { UserEntity } from "./entity.user";
import { NotificationEntity } from "./entity.notification";

@Entity({name:"orders"})
export class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type:"enum",enum:DesignClass,default:DesignClass.A})
    design_class: DesignClass
    
    @Column("longtext",{unique:true})
    order_id: string

    @Column("longtext")
    design_brief: string  
    
    @Column({type:"enum",enum:DesignPackage,default:DesignPackage.BASIC})
    design_package: DesignPackage 
    
    @Column({type:"enum",enum:OrderType,default:OrderType.ONE_OFF})
    type: OrderType 
    
    @Column("longtext")
    design_type: string
    
    @Column("json",{nullable:true})
    design_assets?:any     
    
    @Column("json",{nullable:true})
    design_preferences?:any  
    
    @Column("json",{nullable:true})
    design_samples?:any 

    @Column({type:"enum",enum:OrderStatus,default:OrderStatus.DRAFT})
    status: string

    @Column("bigint")
    amount:number

    @Column("boolean",{default:false})
    confidential:boolean  
    
    @Column("boolean",{default:false})
    quick_delivery:boolean

    @Column("date",{nullable:true})
    delivery_date?:Date   
    
    @Column("date",{nullable:true})
    started_at?:Date 
    
    @Column("date",{nullable:true})
    commenced_at?:Date    
    
    @Column("date",{nullable:true})
    completed_at?:Date    
    
    @Column("date",{nullable:true})
    last_edited_at?:Date

    @OneToMany(()=>OrderResizeExtraEntity,(resizeExtras)=>resizeExtras.order)
    resize_extras:OrderResizeExtraEntity[]
    
    @OneToMany(()=>OrderBriefAttachmentEntity,(briefAttachments)=>briefAttachments.order)
    brief_attachments:OrderBriefAttachmentEntity[]
    
    @OneToMany(()=>OrderPageEntity,(pages)=>pages.order)
    pages:OrderPageEntity[]
    
    @OneToMany(()=>OrderSubmissionEntity,(submissions)=>submissions.order)
    submissions:OrderPageEntity[] 
    
    @OneToMany(()=>NotificationEntity,(notification)=>notification.order)
    notifications:NotificationEntity[] 
    
    @ManyToOne(()=>UserEntity,(user)=>user.orders)
    @JoinColumn()
    user:UserEntity

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 