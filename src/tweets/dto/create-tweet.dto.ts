import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  authorId: number; // el id del usuario que crea el tweet
}
