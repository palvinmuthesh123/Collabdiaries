import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
import {ReferralModule} from './referral/referral.module';
import {SettingModule} from './setting/setting.module';

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
    ReferralModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
