import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../enum';
export declare const Roles: (...roles: UserType[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class UserRoleGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
