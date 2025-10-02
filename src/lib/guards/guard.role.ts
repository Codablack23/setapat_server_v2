import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '../types';
import { AppResponse } from '../utils';
import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enum';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<UserType[]>(
      'roles',
      context.getHandler(),
    );
    if (!allowedRoles || allowedRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest<AuthRequest>();
    if (!allowedRoles.includes(req.user.user_type)) {
      throw new ForbiddenException(
        AppResponse.getFailedResponse(
          'You are not allowed to access this resource',
        ),
      );
    }
    return true;
  }
}
