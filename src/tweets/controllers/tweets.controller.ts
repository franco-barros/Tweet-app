import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TweetsService } from '../services/tweets.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ITweet } from '../../interfaces/tweet.interface';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateTweetDto): Promise<ITweet> {
    return this.tweetsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ITweet[]> {
    return this.tweetsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ITweet> {
    return this.tweetsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTweetDto,
  ): Promise<ITweet> {
    return this.tweetsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.tweetsService.remove(id);
  }
}
