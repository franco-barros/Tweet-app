import { Module } from '@nestjs/common';
import { FollowsService } from './services/follows.service';
import { FollowsController } from './controllers/follows.controller';

@Module({
  controllers: [FollowsController],
  providers: [FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
