import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from '../dto/create-follow.dto';
import { DeleteFollowDto } from '../dto/delete-follow.dto';
import { FollowEntity } from '../entities/follow.entity';
import { IFollow } from '../../interfaces/follow.interface';

// Base de datos temporal
const followsDB: FollowEntity[] = [];

@Injectable()
export class FollowsService {
  async create(data: CreateFollowDto): Promise<IFollow> {
    // Evitar duplicados
    const exists = followsDB.find(
      (f) =>
        f.followerId === data.followerId && f.followingId === data.followingId,
    );
    if (exists) return exists;

    const newFollow = new FollowEntity({
      id: Date.now(),
      ...data,
    });

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

  async findAll(): Promise<IFollow[]> {
    return followsDB;
  }

  async findOne(id: number): Promise<IFollow> {
    const follow = followsDB.find((f) => f.id === id);
    if (!follow) throw new NotFoundException('Follow no encontrado');
    return follow;
  }

  async findFollowers(userId: number): Promise<IFollow[]> {
    return followsDB.filter((f) => f.followingId === userId);
  }

  async findFollowing(userId: number): Promise<IFollow[]> {
    return followsDB.filter((f) => f.followerId === userId);
  }
}
