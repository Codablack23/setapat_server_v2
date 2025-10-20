import { OrderSubmissionEntity } from './entity.order_submissions';
import { OrderEditStatus } from "src/lib";
import { OrderEntity } from "./entity.order";
import { OrderEditPageEntity } from './entity.edit_page';
import { SubmissionRevisions } from './entity.revisions';
export declare class OrderEditEntity {
    id: string;
    status: OrderEditStatus;
    created_at: Date;
    completed_at: Date;
    updated_at: Date;
    order: OrderEntity;
    submissions: OrderSubmissionEntity;
    revisions: SubmissionRevisions;
    pages: OrderEditPageEntity[];
}
