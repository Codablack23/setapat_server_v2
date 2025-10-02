import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";
export declare const useValidationException: (validationErrors: ValidationError[]) => BadRequestException;
