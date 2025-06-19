import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { generateToken } from '../common/utils/token.util';

const SECRET_SALT = 'supersecretsalt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException();

    const users = await this.usersService.findAll();
    const user = users.find((u) => generateToken(u.id, SECRET_SALT) === token);
    if (!user) throw new UnauthorizedException();

    (req as any).user = user;
    return true;
  }
}
