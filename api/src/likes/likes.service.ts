import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './likes.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private repo: Repository<Like>) {}

  findByUser(user: User) {
    return this.repo.find({ where: { user } });
  }

  async createLike(cat_id: string, url: string, user: User) {
    const existing = await this.repo.findOne({ where: { cat_id, user } });
    if (existing) throw new Error('Already liked');

    const like = this.repo.create({ cat_id, url, user });
    return this.repo.save(like);
  }

  findByCatId(user: User, cat_id: string) {
    return this.repo.findOne({ where: { cat_id, user } });
  }

  deleteLike(like: Like) {
    return this.repo.remove(like);
  }
}
