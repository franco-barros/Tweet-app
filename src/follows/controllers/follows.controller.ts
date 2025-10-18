import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { FollowsService } from '../services/follows.service';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { DeleteFollowDto } from '../dto/delete-follow.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateFollowDto) {
    return this.followsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() dto: DeleteFollowDto) {
    return this.followsService.remove(dto);
  }
}
