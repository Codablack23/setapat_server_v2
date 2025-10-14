import { CreateOrderDto } from './create-order.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  DesignUnits,
  AttachmentTypes,
  SubmissionPageType,
  SubmissionType,
  DesignExportFormats,
  RESIZE_COST,
} from 'src/lib';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

// ResizeExtras DTO (mirrors OrderResizeExtraEntity)
export class ResizeExtraDto {
  @ApiProperty({ example: 'Poster Design', description: 'Type of design' })
  @IsString()
  design_type: string;

  @ApiProperty({
    enum: DesignUnits,
    description: 'Measurement unit for the design',
  })
  @IsEnum(DesignUnits)
  unit: DesignUnits;

  @ApiProperty({ example: 2, description: 'Number of design pages' })
  @IsInt()
  design_page: number;

  @ApiProperty({ example: 1, description: 'Page number related to resize' })
  @IsInt()
  page: number;

  @ApiProperty({ example: 1, description: 'Page number related to resize' })
  @IsNumber()
  @Min(RESIZE_COST, {
    message: `Price should atleast be ₦${RESIZE_COST.toLocaleString()}`,
  })
  price: number;

  @ApiProperty({ example: 1080, description: 'Width of the design in px' })
  @IsInt()
  width: number;

  @ApiProperty({ example: 1920, description: 'Height of the design in px' })
  @IsInt()
  height: number;
}

// BriefAttachment DTO (mirrors OrderBriefAttachmentEntity)
export class BriefAttachmentDto {
  @ApiProperty({
    enum: AttachmentTypes,
    description: 'Type of attachment (image, audio, etc.)',
  })
  @IsEnum(AttachmentTypes)
  type: AttachmentTypes;

  @ApiProperty({ example: 'Logo File', description: 'File name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'png', description: 'File extension' })
  @IsString()
  extension: string;

  @ApiProperty({ example: 2048, description: 'File size in KB' })
  @IsInt()
  file_size: number;

  @ApiProperty({
    example: 120,
    description: 'Length of audio file in seconds',
    required: false,
  })
  @IsInt()
  @IsOptional()
  audio_length?: number;

  @ApiProperty({
    example: 'https://cdn.example.com/files/logo.png',
    description: 'URL to file',
  })
  @IsString()
  file_url: string;
}

// Main DTO for adding a design brief
export class AddDesignBriefDto {
  @ApiProperty({
    example: 'We want a modern, minimalistic poster design',
    description: 'Brief for the design order',
  })
  @IsString()
  design_brief: string;

  @ApiProperty({
    example: ['https://cdn.example.com/assets/brand-guide.pdf'],
    description: 'List of uploaded asset URLs',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  design_assets?: string[];

  @ApiProperty({
    example: '1,000',
    description: 'Update amount from other costing',
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1000, { message: 'Please provide amount greater than 10000' })
  amount?: number;

  @ApiProperty({
    example: ['https://cdn.example.com/samples/sample1.png'],
    description: 'Preferred design styles',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  design_preference?: string[];

  @ApiProperty({
    example: ['https://cdn.example.com/samples/sample1.png'],
    description: 'Sample references for the design',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  design_samples?: string[];

  @ApiProperty({
    description: 'List of resize extra details',
    required: false,
    type: [ResizeExtraDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResizeExtraDto)
  @IsOptional()
  resize_extras?: ResizeExtraDto[];

  @ApiProperty({
    description: 'List of brief attachments',
    required: false,
    type: [BriefAttachmentDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BriefAttachmentDto)
  @IsOptional()
  brief_attachments?: BriefAttachmentDto[];
}

export class MakeOrderConfidentialDto {
  @ApiProperty({
    description: 'Show confidential status',
    required: false,
    type: Boolean, // use Boolean (not 'boolean')
    default: false, // helps Swagger render optional property
    nullable: true, // ensures optional property is displayed
  })
  @IsBoolean()
  @IsOptional()
  confidential?: boolean = false;
}
// Single Submission DTO
export class OrderSubmissionDto {
  @ApiProperty({
    enum: SubmissionType,
    description: 'Type of submission',
    default: SubmissionType.ORDER,
  })
  @IsEnum(SubmissionType)
  type: SubmissionType;

  @ApiProperty({
    enum: SubmissionPageType,
    description: 'Page type of submission',
    default: SubmissionPageType.PAGE,
  })
  @IsEnum(SubmissionPageType)
  page_type: SubmissionPageType;

  @ApiProperty({
    example: 2,
    description: 'Resize page number if submission is a resize',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  resize_page?: number;

  @ApiProperty({
    enum: DesignExportFormats,
    description: 'Export format of the design',
  })
  @IsEnum(DesignExportFormats)
  export_format: DesignExportFormats;

  @ApiProperty({ example: 1, description: 'Page number in the order' })
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 'https://cdn.example.com/file.png',
    description: 'URL to the submitted file',
  })
  @IsString()
  file_url: string;

  @ApiProperty({ example: 'file.png', description: 'File name' })
  @IsString()
  file_name: string;

  @ApiProperty({
    example: 2048,
    description: 'File size in bytes',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  file_size?: number;

  @ApiProperty({ enum: AttachmentTypes, description: 'Attachment type' })
  @IsEnum(AttachmentTypes)
  file_type: AttachmentTypes;

  @ApiProperty({ example: 'png', description: 'File extension' })
  @IsString()
  file_extension: string;
}

// DTO containing multiple submissions
export class AddOrderSubmissionsDto {
  @ApiProperty({
    type: [OrderSubmissionDto],
    description: 'Array of order submissions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderSubmissionDto)
  submissions: OrderSubmissionDto[];
}

export class CreateOrderReviewDto {
  @ApiProperty({
    description: 'Rating for the order (1-5)',
    minimum: 1,
    maximum: 5,
    type: Number,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional comment for the review',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
