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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const lib_1 = require("../lib");
const providers_1 = require("../providers");
let AuthService = class AuthService {
    jwtService;
    userRepository;
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async registerUser(registerUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: registerUserDto.email
            }
        });
        if (existingUser)
            throw new common_1.BadRequestException(lib_1.AppResponse.getResponse("success", {
                message: "User already exists"
            }));
        const newUser = this.userRepository.create({
            ...registerUserDto,
        });
        const user = await this.userRepository.save(newUser);
        return this.loginUser(this.removePasswordFromUserObject(user));
    }
    removePasswordFromUserObject(object) {
        return Object.keys(object).reduce((acc, key) => {
            if (key !== "password") {
                acc[key] = object[key];
            }
            return acc;
        }, {});
    }
    async verifyUser(email, password) {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
        if (!user)
            throw new common_1.UnauthorizedException({
                status: "failed",
                message: "User does not exist"
            });
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException({
                status: "failed",
                message: "Incorrect credentials please check the email and try again"
            });
        return {
            ...this.removePasswordFromUserObject({})
        };
    }
    async loginUser(user) {
        const token = this.jwtService.sign(user);
        return lib_1.AppResponse.getResponse("success", {
            message: "Login successful",
            data: {
                token,
                user
            }
        });
    }
    async loginWithGoogle(accessToken) {
        const { email, avatar, firstname, lastname } = await providers_1.GoogleOAuthProvider.verifyToken(accessToken);
        const existingUser = await this.userRepository.findOne({
            where: {
                email,
                user_type: lib_1.UserType.USER
            }
        });
        if (!existingUser) {
            const newUser = this.userRepository.create({
                email,
                firstname,
                lastname,
                avatar,
                password: email
            });
            const user = await this.userRepository.save(newUser);
            const res = await this.loginUser(this.removePasswordFromUserObject(user));
            return res;
        }
        const res = await this.loginUser(this.removePasswordFromUserObject(existingUser));
        return res;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map