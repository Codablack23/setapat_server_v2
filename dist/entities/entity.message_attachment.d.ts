import { AttachmentTypes } from 'src/lib';
import { MessageEntity } from './entity.messages';
export declare class MessageAttachmentEntity {
    id: string;
    type: AttachmentTypes;
    name: string;
    extension: string;
    file_size: number;
    audio_length?: number;
    file_url: string;
    message: MessageEntity;
}
