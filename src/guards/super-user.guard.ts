import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class SuperUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const uids = this.reflector.get<number[]>('uids', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    return uids.includes(req.uid);
  }
}
