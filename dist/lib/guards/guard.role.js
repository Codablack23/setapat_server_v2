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
exports.UserRoleGuard = exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const utils_1 = require("../utils");
const common_2 = require("@nestjs/common");
const Roles = (...roles) => (0, common_2.SetMetadata)('roles', roles);
exports.Roles = Roles;
let UserRoleGuard = class UserRoleGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowedRoles = this.reflector.get('roles', context.getHandler());
        if (!allowedRoles || allowedRoles.length === 0)
            return true;
        const req = context.switchToHttp().getRequest();
        if (!allowedRoles.includes(req.user.user_type)) {
            throw new common_1.ForbiddenException(utils_1.AppResponse.getFailedResponse('You are not allowed to access this resource'));
        }
        return true;
    }
};
exports.UserRoleGuard = UserRoleGuard;
exports.UserRoleGuard = UserRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], UserRoleGuard);
//# sourceMappingURL=guard.role.js.map