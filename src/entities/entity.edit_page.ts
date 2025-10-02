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
import { OrderEditEntity } from './entity.order_edits';
import { OrderResizeExtraEntity } from "./entity.order_resize";
import { designPlans } from "../lib/schema";


@Entity({ name: "order_edit_pages" })
export class OrderEditPageEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  page: number;

  @Column("int", { default: 1 })
  revisions: number;

  @Column('bigint', {
    transformer: {
      to: (value: number) => Math.round(value * 100), // multiply by 100 before save
      from: (value: string) => Number(value) / 100, // divide by 100 when reading
    },
    default: designPlans.BASIC.price.A * 25,
  })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => OrderEditEntity, (orderEdit) => orderEdit.pages)
  @JoinColumn()
  order_edit: OrderEditEntity;

  @OneToMany(() => OrderResizeExtraEntity, (resize) => resize.edit_page)
  page_resizes: OrderResizeExtraEntity[];
}
