/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    Check,
    OneToOne
} from "typeorm";

import { DesignerRanks, DesignerRole, } from "src/lib";
import { OrderAssignmentEntity } from "./entity.order_assignments";
import { UserEntity } from "./entity.user";

@Entity({ name: "designer_profiles" })
@Check(`"id" <> "supervisorId"`)
export class DesignerProfileEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "enum", enum: DesignerRole, default: DesignerRole.DESIGNER })
    role: DesignerRole    
    
    @Column({ type: "int", default:1 })
    level: number

    @Column({ type: "enum", enum: DesignerRanks, default: DesignerRanks.JUNIOR })
    rank: DesignerRanks

    @OneToOne(()=>UserEntity,(user)=>user.designer)
    @JoinColumn()
    user:UserEntity

    @OneToMany(() => OrderAssignmentEntity, (assignments) => assignments.designer)
    order_assignments: OrderAssignmentEntity[]

    @OneToMany(() => DesignerProfileEntity, (designer) => designer.supervisor)
    designers: DesignerProfileEntity[]

    @ManyToOne(() => DesignerProfileEntity, (designer) => designer.designers, {
        nullable: true,
        onDelete: "SET NULL", // if supervisor deleted, keep designers but unlink
    })
    @JoinColumn()
    supervisor?: DesignerProfileEntity | null;

    @Column("json")
    designer_specifications: string[];

    @Column("json")
    working_days: string[];

    @Column("text")
    resume_link: string

    @Column("text")
    portfolio_link: string

    @Column("time")
    opens_at: string

    @Column("time")
    closes_at: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 