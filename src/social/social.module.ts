import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollabFollowingDetail } from './entity/collab-following-detail.entity';
import { CollabIdentityCount } from './entity/collab-identity-count.entity';
import { Promotion } from './entity/promotion.entity';
import { SocialIdentityCount } from './entity/social-identity-count.entity';
import { SocialLike } from './entity/social-like.entity';
import { SocialPost } from './entity/social-post.entity';
import { SocialComment } from './entity/social-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollabFollowingDetail,
      CollabIdentityCount,
      Promotion,
      SocialIdentityCount,
      SocialLike,
      SocialPost,
      SocialComment,
    ]),
  ],
  providers: [SocialService],
  controllers: [SocialController],
  exports: [SocialService],
})
export class SocialModule {}
