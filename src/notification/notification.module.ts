import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {NotificationSetting} from "./entities/notification-setting.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notification,NotificationSetting])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
