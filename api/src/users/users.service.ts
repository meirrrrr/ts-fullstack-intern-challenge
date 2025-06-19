import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findByLogin(login: string) {
    return this.repo.findOne({ where: { login } });
  }

  createUser(login: string, password: string) {
    const user = this.repo.create({ login, password });
    return this.repo.save(user);
  }
}
