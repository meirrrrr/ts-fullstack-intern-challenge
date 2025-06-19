import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './likes.entity';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UsersModule],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
