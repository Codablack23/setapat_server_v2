import { CreateOrderDto } from './create-order.dto';
import { DesignUnits, AttachmentTypes, SubmissionPageType, SubmissionType, DesignExportFormats } from 'src/lib';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
}
export declare class ResizeExtraDto {
    design_type: string;
    unit: DesignUnits;
    design_page: number;
    page: number;
    price: number;
    width: number;
    height: number;
}
export declare class BriefAttachmentDto {
    type: AttachmentTypes;
    name: string;
    caption?: string;
    extension: string;
    file_size: number;
    audio_length?: number;
    file_url: string;
}
export declare class AddDesignBriefDto {
    design_brief: string;
    design_assets?: string[];
    amount?: number;
    design_preference?: string[];
    design_samples?: string[];
    resize_extras?: ResizeExtraDto[];
    brief_attachments?: BriefAttachmentDto[];
}
export declare class MakeOrderConfidentialDto {
    confidential?: boolean;
}
export declare class OrderSubmissionDto {
    type: SubmissionType;
    page_type: SubmissionPageType;
    resize_page?: number;
    export_format: DesignExportFormats;
    page: number;
    file_url: string;
    file_name: string;
    file_size?: number;
    file_type: AttachmentTypes;
    file_extension: string;
}
export declare class AddOrderSubmissionsDto {
    submissions: OrderSubmissionDto[];
}
export declare class AddEditSubmissionsDto {
    edit_id: string;
    submissions: OrderSubmissionDto[];
}
export declare class CompleteEditDto {
    edit_id: string;
}
export declare class CreateOrderReviewDto {
    rating: number;
    comment?: string;
}
export {};
