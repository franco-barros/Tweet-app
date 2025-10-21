import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dto/create-like.dto';
import { DeleteLikeDto } from '../dto/delete-like.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ILike } from '../../interfaces/like.interface';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateLikeDto): Promise<ILike> {
    return this.likesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ILike[]> {
    return this.likesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ILike> {
    return this.likesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Body() dto: DeleteLikeDto): Promise<{ message: string }> {
    return this.likesService.remove(dto);
  }
}
