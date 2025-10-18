import { Injectable, NotFoundException } from '@nestjs/common';
import { Follow } from '../entities/follow.entity';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { DeleteFollowDto } from '../dto/delete-follow.dto';

// Base de datos temporal en memoria
const followsDB: Follow[] = [];

@Injectable()
export class FollowsService {
  async create(data: CreateFollowDto): Promise<Follow> {
    const exists = followsDB.find(
      (f) =>
        f.followerId === data.followerId && f.followingId === data.followingId,
    );
    if (exists) return exists; // evitar duplicados

    const newFollow: Follow = {
      id: Date.now(),
      followerId: data.followerId,
      followingId: data.followingId,
      createdAt: new Date(),
    };
    followsDB.push(newFollow);
    return newFollow;
  }

  async remove(data: DeleteFollowDto): Promise<{ message: string }> {
    const index = followsDB.findIndex(
      (f) =>
        f.followerId === data.followerId && f.followingId === data.followingId,
    );
    if (index === -1) throw new NotFoundException('Follow no encontrado');

    followsDB.splice(index, 1);
    return { message: 'Follow eliminado correctamente' };
  }

  // Opcional: listar seguidores o seguidos
  async findFollowers(userId: number): Promise<Follow[]> {
    return followsDB.filter((f) => f.followingId === userId);
  }

  async findFollowing(userId: number): Promise<Follow[]> {
    return followsDB.filter((f) => f.followerId === userId);
  }
}
