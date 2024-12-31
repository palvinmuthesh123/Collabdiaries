import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Registration} from '../users/entity/registration.entity';
import {Category} from '../category/category.entity';
import {IdentityDetail} from '../users/entity/identity-detail.entity';
import {IdentityLocation} from '../users/entity/location.entity';
import {UserCoverPhoto} from '../users/entity/user-coverphoto.entity';
import {Country} from '../country/country.entity';
import {State} from '../state/state.entity';
import {City} from '../city/city.entity';
import {Perks} from '../perks/perks.entity';
import {Bid} from '../bidding/entity/bid.entity';
import {Negotiation} from '../bidding/entity/bid-negotiation.entity';
import {SocialIdentityCount} from '../social/entity/social-identity-count.entity';
import {CollabIdentityCount} from '../social/entity/collab-identity-count.entity';
import {CollabFollowingDetail} from '../social/entity/collab-following-detail.entity';
import {Promotion} from '../social/entity/promotion.entity';
import {SocialLike} from '../social/entity/social-like.entity';
import {SocialComment} from '../social/entity/social-comment.entity';
import {SocialPost} from '../social/entity/social-post.entity';
import {Notification} from "../notification/entities/notification.entity";
import {NotificationSetting} from "../notification/entities/notification-setting.entity";
import {ReferralDetails} from "../referral/entities/referral.entity";
import {IdentityBlock} from "../setting/entities/user-block-setting.entity";
import {ReportDetails} from "../setting/entities/report-setting.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // Convert to number
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Registration,
        Category,
        IdentityDetail,
        IdentityLocation,
        UserCoverPhoto,
        Country,
        State,
        City,
        Perks,
        Bid,
        Negotiation,
        SocialIdentityCount,
        CollabIdentityCount,
        CollabFollowingDetail,
        Promotion,
        SocialLike,
        SocialComment,
        SocialPost,
        Notification,
        NotificationSetting,
        ReferralDetails,
        IdentityBlock,
        ReportDetails,
      ],
      logging: true, // Enable logging to check synchronization queries
      ssl: {
        rejectUnauthorized: false,
        // ca: process.env.POSTGRES_SSL_SERVER_CA_CERTIFICATE,
        // key: process.env.POSTGRES_SSL_CLIENT_KEY,
        // cert: process.env.POSTGRES_SSL_CLIENT_CERTIFICATE,
      },
      synchronize: true,
    }),
  ],
})
export class AppConfigModule {}
