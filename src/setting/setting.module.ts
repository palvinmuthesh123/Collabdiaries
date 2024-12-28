import {Module} from '@nestjs/common';
import {SettingService} from './setting.service';
import {SettingController} from './setting.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IdentityDetail} from "../users/entity/identity-detail.entity";
import {IdentityBlock} from "./entities/user-block-setting.entity";
import {ReportDetails} from "./entities/report-setting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([IdentityDetail,IdentityBlock,ReportDetails])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
