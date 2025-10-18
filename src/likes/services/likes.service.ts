import { Injectable, NotFoundException } from '@nestjs/common';
import { Like } from '../entities/like.entity';
import { CreateLikeDto } from '../dto/create-like.dto';
import { DeleteLikeDto } from '../dto/delete-like.dto';

// Base de datos temporal en memoria
const likesDB: Like[] = [];

@Injectable()
export class LikesService {
  async create(data: CreateLikeDto): Promise<Like> {
    const newLike: Like = {
      id: Date.now(),
      userId: data.userId,
      tweetId: data.tweetId,
      createdAt: new Date(),
    };

    // Evitar likes duplicados del mismo usuario sobre el mismo tweet
    const exists = likesDB.find(
      (l) => l.userId === data.userId && l.tweetId === data.tweetId,
    );
    if (exists) return exists;

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

  // Opcional: listar likes de un tweet
  async findByTweet(tweetId: number): Promise<Like[]> {
    return likesDB.filter((l) => l.tweetId === tweetId);
  }
}
