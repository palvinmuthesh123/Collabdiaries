import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {AppConfigModule} from './config/config.module';
import {CategoryModule} from './category/category.module';
import {CountryModule} from './country/country.module';
import {StateModule} from './state/state.module';
import {CityModule} from './city/city.module';
import {PerksModule} from './perks/perks.module';
import {UsersModule} from './users/users.module';
import {BiddingModule} from './bidding/bidding.module';
import {SocialModule} from './social/social.module';
import {NotificationModule} from './notification/notification.module';
import {SettingModule} from './setting/setting.module';
import { GroupModule } from './group/group.module';
import { DiaryModule } from './diary/diary.module';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { MemberModule } from './member/member.module';
import { PageModule } from './page/page.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    CountryModule,
    StateModule,
    CityModule,
    PerksModule,
    BiddingModule,
    SocialModule,
    NotificationModule,
    SettingModule,
    GroupModule,
    DiaryModule,
    PostModule,
    ProductModule,
    MemberModule,
    PageModule,
    InstagramModule,
  ],
})
export class AppModule {}
