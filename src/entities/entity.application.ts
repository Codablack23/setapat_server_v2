/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import { DesignerRanks, Gender, } from "src/lib";
import { OrderEntity } from "./entity.order";


@Entity({ name: "designer_applications" })
export class DesignerApplicationEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext")
    firstname: string

    @Column("longtext")
    lastname: string

    @Column("longtext")
    email: string

    @Column({ type: "enum", enum: Gender, nullable: true })
    gender: Gender

    @Column("longtext",)
    phone_number: string

    @Column("longtext", { nullable: true })
    avatar: string

    @Column("longtext", { nullable: true })
    telegram_handle?: string

    @Column({ type: "enum", enum: DesignerRanks, default: DesignerRanks.JUNIOR })
    rank: DesignerRanks

    @Column("json")
    designer_specifications: string[]

    @Column("text")
    resume_link: string

    @Column("text")
    portfolio_link: string

    @Column("json")
    working_days: string[]

    @Column("time")
    opens_at: string

    @Column("time")
    closes_at: string

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
} 