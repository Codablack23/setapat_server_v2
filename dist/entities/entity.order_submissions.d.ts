import { DesignExportFormats, SubmissionPageType, SubmissionType } from "src/lib";
import { OrderEntity } from "./entity.order";
import { OrderEditEntity } from "./entity.order_edits";
import { MessageEntity } from "./entity.messages";
export declare class OrderSubmissionEntity {
    id: string;
    type: SubmissionType;
    page_type: SubmissionPageType;
    resize_page?: number;
    export_format: DesignExportFormats;
    page: number;
    file_url: string;
    file_name: string;
    file_size: number;
    file_type: number;
    file_extension: number;
    created_at: Date;
    updated_at: Date;
    order: OrderEntity;
    message: MessageEntity;
    order_edit?: OrderEditEntity;
}
