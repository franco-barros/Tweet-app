import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TweetsService } from '../services/tweets.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTweetDto) {
    return this.tweetsService.create(dto);
  }

  @Get()
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTweetDto) {
    return this.tweetsService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tweetsService.remove(+id);
  }
}
