import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, _: Response, next: () => void) {
    const token = (req.headers.authorization ?? '').split('Bearer ')[1];
    try {
      const { uid } = this.authService.verifyToken(token);
      if (uid) {
        req.uid = uid;
      }
    } catch (err) {
      req.uid = undefined;
      console.log(err);
    }
    next();
  }
}
