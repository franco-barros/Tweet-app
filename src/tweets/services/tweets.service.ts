import { Injectable, NotFoundException } from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';

const tweetsDB: Tweet[] = [];

@Injectable()
export class TweetsService {
  async create(data: CreateTweetDto): Promise<Tweet> {
    const newTweet: Tweet = {
      id: Date.now(),
      content: data.content,
      authorId: data.authorId,
      createdAt: new Date(),
    };
    tweetsDB.push(newTweet);
    return newTweet;
  }

  async findAll(): Promise<Tweet[]> {
    return tweetsDB;
  }

  async findOne(id: number): Promise<Tweet> {
    const tweet = tweetsDB.find((t) => t.id === id);
    if (!tweet) throw new NotFoundException('Tweet no encontrado');
    return tweet;
  }

  async update(id: number, data: UpdateTweetDto): Promise<Tweet> {
    const tweet = await this.findOne(id);
    Object.assign(tweet, data);
    return tweet;
  }

  async remove(id: number): Promise<{ message: string }> {
    const index = tweetsDB.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Tweet no encontrado');
    tweetsDB.splice(index, 1);
    return { message: 'Tweet eliminado correctamente' };
  }
}
