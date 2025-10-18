import { IsNumber } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  followerId: number; // usuario que sigue

  @IsNumber()
  followingId: number; // usuario que es seguido
}
