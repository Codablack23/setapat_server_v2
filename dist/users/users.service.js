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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const lib_1 = require("../lib");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException(lib_1.AppResponse.getResponse('failed', {
                message: 'You are not authorized',
            }));
        }
        if (updateProfileDto.email) {
            const existingUserCount = await this.userRepository.count({
                where: {
                    id: (0, typeorm_2.Not)(userId),
                    user_type: lib_1.UserType.USER,
                    email: updateProfileDto.email,
                },
            });
            if (existingUserCount > 0) {
                throw new common_1.BadRequestException(lib_1.AppResponse.getResponse('failed', {
                    message: 'A user with the same email already exists',
                }));
            }
        }
        Object.assign(user, updateProfileDto);
        const updatedUser = await this.userRepository.save(user);
        const { password, ...userWithoutPassword } = updatedUser;
        return lib_1.AppResponse.getResponse('success', {
            data: { profile: userWithoutPassword },
            message: 'Profile updated successfully',
        });
    }
    async updateAvatar(userId, updateAvatarDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(lib_1.AppResponse.getResponse('failed', {
                message: 'You are not authorized',
            }));
        }
        user.avatar = updateAvatarDto.avatar;
        await this.userRepository.save(user);
        return lib_1.AppResponse.getResponse('success', {
            data: {
                avatar: updateAvatarDto.avatar,
            },
            message: 'Profile Picture updated successfully',
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map