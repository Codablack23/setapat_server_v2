import { AttachmentTypes } from 'src/lib';
export declare class MessageAttachmentDto {
    type: AttachmentTypes;
    name: string;
    extension: string;
    file_size: number;
    audio_length?: number;
    file_url: string;
}
export declare class SendMessageDto {
    content?: string;
    attachments?: MessageAttachmentDto[];
}
