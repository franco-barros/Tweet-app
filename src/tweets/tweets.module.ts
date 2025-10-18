import { Module } from '@nestjs/common';
import { TweetsService } from './services/tweets.service';
import { TweetsController } from './controllers/tweets.controller';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService],
  exports: [TweetsService], // por si otro módulo necesita acceder a tweets
})
export class TweetsModule {}
