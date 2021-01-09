import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles.length === 0) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    if (!req.uid) {
      return false;
    }

    const user = await this.userService.findById(req.uid);
    if (!user) {
      return false;
    }
    return requiredRoles.includes(user.role);
  }
}
