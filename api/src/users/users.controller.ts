import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { generateToken } from '../common/utils/token.util';

const SECRET_SALT = 'supersecretsalt';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(
    @Body() body: { login: string; password: string },
    @Res() res: Response,
  ) {
    const { login, password } = body;
    if (!login || !password) return res.status(405).send('Invalid input');

    const existing = await this.usersService.findByLogin(login);
    if (existing) return res.status(405).send('User already exists');

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(login, hash);
    const token = generateToken(user.id, SECRET_SALT!);

    return res.status(201).set('X-Auth-Token', token).json(user);
  }
}
