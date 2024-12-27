import {Module} from '@nestjs/common';
import {ReferralService} from './referral.service';
import {ReferralController} from './referral.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReferralDetails} from "./entities/referral.entity";
import {IdentityDetail} from "../users/entity/identity-detail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReferralDetails,IdentityDetail])],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
