import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dto/create-like.dto';
import { DeleteLikeDto } from '../dto/delete-like.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateLikeDto) {
    return this.likesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() dto: DeleteLikeDto) {
    return this.likesService.remove(dto);
  }
}
