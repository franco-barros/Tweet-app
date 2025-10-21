import { ITweet } from '../../interfaces/tweet.interface';

export class TweetEntity implements ITweet {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ITweet>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt ?? new Date(),
      updatedAt: partial.updatedAt ?? new Date(),
    });
  }
}
