/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { designPlans, DesignUnits } from 'src/lib';

// DTO for resize extras inside a page
export class CreateOrderResizeExtraDto {
  @ApiProperty({ description: 'Type of design', example: 'Flyer' })
  @IsString()
  design_type: string;

  @ApiProperty({ description: 'Unit type', enum: DesignUnits })
  @IsEnum(DesignUnits)
  unit: DesignUnits;

  @ApiProperty({ description: 'Amount', example: 5000 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Resize Page Number', example: 1 })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Width of resized page', example: 1080 })
  @IsInt()
  @IsPositive()
  width: number;

  @ApiProperty({ description: 'Height of resized page', example: 1920 })
  @IsInt()
  @IsPositive()
  height: number;
}

// DTO for each page in the edit
export class CreateOrderEditPageDto {
  @ApiProperty({ description: 'Page number', example: 1 })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Number of revisions for this page', example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  revisions?: number = 1;
  
  @ApiProperty({ description: 'edit cost', example: 1000, required: true })
  @IsNumber()
  @Min(designPlans.BASIC.price.A * 0.25)
  price: number = 1;

  @ApiProperty({ type: [CreateOrderResizeExtraDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderResizeExtraDto)
  page_resizes?: CreateOrderResizeExtraDto[];
}

// DTO for creating an edit
export class CreateOrderEditDto {
  @ApiProperty({ type: [CreateOrderEditPageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderEditPageDto)
  pages: CreateOrderEditPageDto[];
}
