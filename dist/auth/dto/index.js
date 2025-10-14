"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWithGoogleDto = exports.LoginUserDto = exports.RegisterUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const lib_1 = require("../../lib");
class RegisterUserDto {
    firstname;
    lastname;
    email;
    phone_number;
    password;
    user_type;
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's first name",
        example: "John",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your firstname" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's last name",
        example: "Doe",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your lastname" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Valid email address of the user",
        example: "john.doe@example.com",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your email" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Valid phone number of the user, including country code",
        example: "+2348012345678",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your phone number" }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Strong password with at least 8 characters, including uppercase, lowercase, number, and special character",
        example: "StrongP@ssw0rd",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your password" }),
    (0, class_validator_1.Length)(6, undefined, {
        message: "Please provide a password with at least 6 characters",
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: `Type of user. Options: ${Object.values(lib_1.UserType).join(", ")}`,
        enum: lib_1.UserType,
        example: lib_1.UserType.USER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(lib_1.UserType, {
        message: `user type can only be one of: ${Object.values(lib_1.UserType).join(", ")}`,
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "user_type", void 0);
class LoginUserDto {
    email;
    password;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Registered email of the user",
        example: "john.doe@example.com",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your email" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Password for the given account",
        example: "StrongP@ssw0rd",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please provide your password" }),
    (0, class_validator_1.Length)(6, undefined, {
        message: "Please provide a password with at least 6 characters",
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
class LoginWithGoogleDto {
    access_token;
}
exports.LoginWithGoogleDto = LoginWithGoogleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "access token for google authentication",
        example: "12346789",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Please an access token" }),
    __metadata("design:type", String)
], LoginWithGoogleDto.prototype, "access_token", void 0);
//# sourceMappingURL=index.js.map