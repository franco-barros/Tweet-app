import { IsNumber } from 'class-validator';

export class DeleteFollowDto {
  @IsNumber()
  followerId: number;

  @IsNumber()
  followingId: number;
}
