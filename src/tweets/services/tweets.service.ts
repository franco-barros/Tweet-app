import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { TweetEntity } from '../entities/tweet.entity';
import { ITweet } from '../../interfaces/tweet.interface';

// Base de datos temporal en memoria
const tweetsDB: TweetEntity[] = [];

@Injectable()
export class TweetsService {
  async create(data: CreateTweetDto): Promise<ITweet> {
    const newTweet = new TweetEntity({
      id: Date.now(),
      ...data,
    });

    tweetsDB.push(newTweet);
    return newTweet;
  }

  async findAll(): Promise<ITweet[]> {
    return tweetsDB;
  }

  async findOne(id: number): Promise<ITweet> {
    const tweet = tweetsDB.find((t) => t.id === id);
    if (!tweet) throw new NotFoundException('Tweet no encontrado');
    return tweet;
  }

  async update(id: number, data: UpdateTweetDto): Promise<ITweet> {
    const tweet = await this.findOne(id);
    Object.assign(tweet, data, { updatedAt: new Date() });
    return tweet;
  }

  async remove(id: number): Promise<{ message: string }> {
    const index = tweetsDB.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Tweet no encontrado');
    tweetsDB.splice(index, 1);
    return { message: 'Tweet eliminado correctamente' };
  }
}
