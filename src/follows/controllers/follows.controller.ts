import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { FollowsService } from '../services/follows.service';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { DeleteFollowDto } from '../dto/delete-follow.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IFollow } from '../../interfaces/follow.interface';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateFollowDto): Promise<IFollow> {
    return this.followsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Body() dto: DeleteFollowDto): Promise<{ message: string }> {
    return this.followsService.remove(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IFollow[]> {
    return this.followsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IFollow> {
    return this.followsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('followers/:userId')
  async findFollowers(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<IFollow[]> {
    return this.followsService.findFollowers(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('following/:userId')
  async findFollowing(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<IFollow[]> {
    return this.followsService.findFollowing(userId);
  }
}
