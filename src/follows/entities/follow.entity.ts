import { IFollow } from '../../interfaces/follow.interface';

export class FollowEntity implements IFollow {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: Date;

  constructor(partial: Partial<IFollow>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt ?? new Date(),
    });
  }
}
