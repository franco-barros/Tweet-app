import { IsNumber } from 'class-validator';

export class DeleteLikeDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  tweetId: number;
}
