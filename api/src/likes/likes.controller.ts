import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { LikesService } from './likes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async list(@Req() req) {
    return { data: await this.likesService.findByUser(req.user) };
  }

  @Post()
  async create(@Body() body: { cat_id: string }, @Req() req) {
    return await this.likesService.createLike(body.cat_id, req.user);
  }

  @Delete(':cat_id')
  async remove(@Param('cat_id') cat_id: string, @Req() req) {
    const like = await this.likesService.findByCatId(req.user, cat_id);
    if (!like) throw new NotFoundException();
    return await this.likesService.deleteLike(like);
  }
}
