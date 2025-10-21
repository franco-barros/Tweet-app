import { ILike } from '../../interfaces/like.interface';

export class LikeEntity implements ILike {
  id: number;
  userId: number;
  tweetId: number;
  createdAt: Date;

  constructor(partial: Partial<ILike>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt ?? new Date(),
    });
  }
}
