import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttachmentTypes } from 'src/lib';

export class MessageAttachmentDto {
  @IsEnum(AttachmentTypes)
  type: AttachmentTypes;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  extension: string;

  @IsNumber()
  file_size: number;

  @IsOptional()
  @IsNumber()
  audio_length?: number;

  @IsString()
  @IsNotEmpty()
  file_url: string;
}

export class SendMessageDto {
  @ValidateIf(
    (o: SendMessageDto) => !o.attachments || o.attachments.length === 0,
  )
  @IsString()
  @IsOptional()
  content?: string;

  @ValidateIf((o: SendMessageDto) => !o.content)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageAttachmentDto)
  @IsOptional()
  attachments?: MessageAttachmentDto[];
}
