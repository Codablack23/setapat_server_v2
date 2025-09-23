/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Gender } from "src/lib"; // assuming your Gender enum is defined here

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User's first name", example: "John" })
    firstname?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User's last name", example: "Doe" })
    lastname?: string;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional({ description: "User's email address", example: "john@example.com" })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User phone number", example: "+2348012345678" })
    phone_number?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User avatar URL", example: "https://example.com/avatar.png" })
    avatar?: string; 
    
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User reason for choosing Setapat", example: "SME" })
    reason?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "Telegram handle", example: "@john_doe" })
    telegram_handle?: string;

    @IsOptional()
    @IsEnum(Gender)
    @ApiPropertyOptional({ description: "User's gender", enum: Gender, example: Gender.MALE })
    gender?: Gender;
}

export class UpdateAvatarDto {

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "User avatar URL", example: "https://example.com/avatar.png" })
    avatar: string;
}
