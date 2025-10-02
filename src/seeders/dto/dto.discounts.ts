import {
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from 'src/entities/entity.discount';

export class CreateDiscountDto {
  @IsEnum(DiscountType)
  @IsOptional()
  type?: DiscountType;

  @IsString()
  @Length(1, 20)
  code: string;

  @IsString()
  @IsOptional()
  description?: string;

  /** Duration in hours, can be fractional */
  @IsDecimal()
  @Type(() => Number)
  @Min(0.1, { message: 'duration_hours must be greater than 0' })
  duration_hours: number = 24;

  @IsBoolean()
  @IsOptional()
  is_one_time?: boolean = false;

  @IsInt()
  @Min(1)
  @IsOptional()
  max_use?: number;

  /** Discount amount: percentage (0–100) or flat value */
  @IsDecimal()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  amount?: number = 30;

  /** Optional minimum order total to apply this discount */
  @IsDecimal()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  min_order_amount?: number;

  /** Maximum discount amount for percentage discounts */
  @IsDecimal()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  max_discount_amount?: number;

  /** Date after which discount becomes active */
  @IsOptional()
  @Type(() => Date)
  starts_at?: Date;

  /** Date discount expires */
  @IsOptional()
  @Type(() => Date)
  expires_at?: Date;

  /** Active time in HH:MM:SS format */
  @IsString()
  @IsOptional()
  active_time?: string;

  /** Active days as array of numbers (0 = Sunday, 6 = Saturday) */
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(7)
  @IsOptional()
  active_days?: number[];
}

export class UpdateDiscountDto extends CreateDiscountDto {
  @IsUUID()
  id: string;
}
