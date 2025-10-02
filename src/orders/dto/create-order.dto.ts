import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DesignClass, DesignUnits, DesignPackage, designPlans } from 'src/lib';

export class PagesDto {
  @ApiPropertyOptional({
    description: 'Whether this page is the default page',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean = false;

  @ApiProperty({
    description: 'The type of design for the page',
    example: 'Flyer',
  })
  @IsNotEmpty({ message: 'Please provide a design type for your page setup' })
  @IsString({ message: 'Page Design type must be a string' })
  design_type: string;

  @ApiProperty({
    description: 'The size of the paper (A4, Letter, etc.)',
    example: 'A4',
  })
  @IsNotEmpty({ message: 'Please provide a paper size' })
  @IsString({ message: 'Paper size must be a string' })
  paper_size: string;

  @ApiProperty({
    description: 'The type of paper (Flex Banner)',
    example: 'Flex Banner',
  })
  @IsNotEmpty({ message: 'Please provide a paper type' })
  @IsString({ message: 'Paper type must be a string' })
  paper_type: string;

  @ApiProperty({
    description: 'Unit of measurement for dimensions',
    enum: DesignUnits,
    example: DesignUnits.mm,
  })
  @IsNotEmpty({ message: 'Please provide a unit' })
  @IsEnum(DesignUnits, {
    message: `Unit can only be ${Object.values(DesignUnits).join(', ')}`,
  })
  unit: DesignUnits;

  @ApiProperty({
    description: 'Page number',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Please provide page number' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page number must be a number' })
  @Min(1, { message: 'Page number must be at least 1' })
  page_number: number;

  @ApiProperty({
    description: 'Page Cost',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Please provide page price' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Page price must be a number' })
  @Min(designPlans.BASIC.price.A1, {
    message: `Page price must be at least ₦${designPlans.BASIC.price.A1.toLocaleString()}`,
  })
  price: number;

  @ApiProperty({
    description: 'Page width in chosen unit',
    example: 210,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Please provide width' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Width must be a number' })
  @Min(1, { message: 'Width must be at least 1' })
  width: number;

  @ApiProperty({
    description: 'Page height in chosen unit',
    example: 297,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Please provide height' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Height must be a number' })
  @Min(1, { message: 'Height must be at least 1' })
  height: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Type of the design',
    example: 'Poster',
  })
  @IsNotEmpty({ message: 'Please provide a design type' })
  @IsString({ message: 'Design type must be a string' })
  design_type: string;

  @ApiProperty({
    description: 'Class of the design',
    enum: DesignClass,
    example: DesignClass.A,
  })
  @IsNotEmpty({ message: 'Please provide a design class' })
  @IsEnum(DesignClass, {
    message: `Design class can only be ${Object.values(DesignClass).join(', ')}`,
  })
  design_class: DesignClass;

  @ApiPropertyOptional({
    description: 'Quick delivery flag',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Quick delivery should be a boolean' })
  quick_delivery?: boolean = false;

  @ApiProperty({
    description: 'Package of the design',
    enum: DesignPackage,
    example: DesignPackage.STANDARD,
  })
  @IsNotEmpty({ message: 'Please provide a design package' })
  @IsEnum(DesignPackage, {
    message: `Design package can only be ${Object.values(DesignPackage).join(', ')}`,
  })
  design_package: DesignPackage;

  @ApiProperty({
    description: 'Delivery time in days',
    example: 7,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'Please provide delivery time' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Delivery time must be a number' })
  @Min(1, { message: 'Delivery time must be at least 1' })
  delivery_time: number;

  @IsNotEmpty({ message: 'Please provide amount' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(1, { message: 'Amount should atleast be 1' })
  amount: number;

  @ApiProperty({
    description: 'List of pages for the order',
    type: [PagesDto],
  })
  @IsNotEmpty({ message: 'Please provide page setup' })
  @IsArray({ message: 'Pages must be an array' })
  @ArrayMinSize(1, { message: 'At least one page must be provided' })
  @ValidateNested({ each: true })
  @Type(() => PagesDto)
  pages: PagesDto[];
}
