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
exports.UpdateAvatarDto = exports.UpdateProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const lib_1 = require("../../lib");
class UpdateProfileDto {
    firstname;
    lastname;
    email;
    phone_number;
    avatar;
    reason;
    telegram_handle;
    gender;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User's first name", example: "John" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "firstname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User's last name", example: "Doe" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User's email address", example: "john@example.com" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User phone number", example: "+2348012345678" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User avatar URL", example: "https://example.com/avatar.png" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User reason for choosing Setapat", example: "SME" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "Telegram handle", example: "@john_doe" }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "telegram_handle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(lib_1.Gender),
    (0, swagger_1.ApiPropertyOptional)({ description: "User's gender", enum: lib_1.Gender, example: lib_1.Gender.MALE }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
class UpdateAvatarDto {
    avatar;
}
exports.UpdateAvatarDto = UpdateAvatarDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: "User avatar URL", example: "https://example.com/avatar.png" }),
    __metadata("design:type", String)
], UpdateAvatarDto.prototype, "avatar", void 0);
//# sourceMappingURL=update_profile.dto.js.map