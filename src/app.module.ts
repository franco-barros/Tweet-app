import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [AuthModule, UsersModule, TweetsModule, LikesModule, FollowsModule],
})
export class AppModule {}
