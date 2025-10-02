import { AttachmentTypes } from 'src/lib';
import { OrderEntity } from './entity.order';
export declare class OrderBriefAttachmentEntity {
    id: string;
    type: AttachmentTypes;
    name: string;
    extension: string;
    file_size: number;
    audio_length?: number;
    file_url: string;
    order: OrderEntity;
}
