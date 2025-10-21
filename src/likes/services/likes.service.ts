import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeEntity } from '../entities/like.entity';
import { CreateLikeDto } from '../dto/create-like.dto';
import { DeleteLikeDto } from '../dto/delete-like.dto';
import { ILike } from '../../interfaces/like.interface';

// Base de datos temporal en memoria
const likesDB: LikeEntity[] = [];

@Injectable()
export class LikesService {
  async create(data: CreateLikeDto): Promise<ILike> {
    // Evitar likes duplicados del mismo usuario sobre el mismo tweet
    const exists = likesDB.find(
      (l) => l.userId === data.userId && l.tweetId === data.tweetId,
    );
    if (exists) return exists;

    const newLike = new LikeEntity({
      id: Date.now(),
      userId: data.userId,
      tweetId: data.tweetId,
    });

    likesDB.push(newLike);
    return newLike;
  }

  async remove(data: DeleteLikeDto): Promise<{ message: string }> {
    const index = likesDB.findIndex(
      (l) => l.userId === data.userId && l.tweetId === data.tweetId,
    );
    if (index === -1) throw new NotFoundException('Like no encontrado');

    likesDB.splice(index, 1);
    return { message: 'Like eliminado correctamente' };
  }

  async findAll(): Promise<ILike[]> {
    return likesDB;
  }

  async findOne(id: number): Promise<ILike> {
    const like = likesDB.find((l) => l.id === id);
    if (!like) throw new NotFoundException('Like no encontrado');
    return like;
  }

  // Listar likes de un tweet
  async findByTweet(tweetId: number): Promise<ILike[]> {
    return likesDB.filter((l) => l.tweetId === tweetId);
  }
}
