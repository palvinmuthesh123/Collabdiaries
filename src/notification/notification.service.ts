import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, Repository} from 'typeorm';
import {Notification} from './entities/notification.entity';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {NotificationSetting} from './entities/notification-setting.entity';
import {NotificationMethod, NotificationType} from '../common/enum';
import {endOfDay, startOfDay} from 'date-fns';
import {UpdateNotificationSettingDto} from "./dto/update-notification-setting.dto";
import {CreateNotificationSettingDto} from "./dto/create-notification-setting.dto";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationSetting)
    private readonly notificationSettingRepository: Repository<NotificationSetting>,
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const {identity_id, type, message } = createNotificationDto;
    // Fetch notification settings for the user
    const settings = await this.notificationSettingRepository.findOne({
      where: { identity_id:identity_id },
    });
    if (!settings) {
      throw new NotFoundException(
        'Notification settings not found for the user',
      );
    }
    // Check if the notification type is allowed
    if (!this.isNotificationTypeEnabled(settings, type)) {
      throw new BadRequestException(
        `Notifications of type '${type}' are disabled for this user`,
      );
    }
    // Fetch the total notifications sent today
    const notificationsSentToday =
      await this.getNotificationsCountForUser(identity_id);
    let method = NotificationMethod.in_app; // Default to in-app notifications if the limit is reached or push is disabled

    // Determine the notification method
    if (notificationsSentToday <= settings.daily_limit) {
      if (settings.push_notifications) {
        method = NotificationMethod.push; // Send as push if within the limit
      }
    }
    // Create and save the notification
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      method,
    });
    return this.notificationRepository.save(notification);
  }

  async getNotificationsCountForUser(userId: string): Promise<number> {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    return await this.notificationRepository.count({
      where: {
        identity_id: userId,
        created_at: Between(todayStart, todayEnd),
        method: NotificationMethod.push, // Count only push notifications
      },
    });
  }

  async findAll(identity_id: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { identity_id },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: id },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async delete(id: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { notification_id: id },
    });
    await this.notificationRepository.remove(notification);
  }
// Logic of Notification - setting ===========================================

  async createSetting(payload:CreateNotificationSettingDto){
    const setting = this.notificationRepository.create(payload)
    return this.notificationSettingRepository.save(setting)
  }

  async findOneNotificationSetting(notification_setting_id:string):Promise<NotificationSetting>{
    const setting = await this.notificationSettingRepository.findOne({where:{notification_setting_id}})
    if (!setting) throw new NotFoundException('Notification setting not found');
    return setting;
  }

  // async findAllNotificationWithIdentity(identity_id: string): Promise<NotificationSetting[]> {
  //   return this.notificationSettingRepository.find({
  //     where: { identity_id },
  //   });
  // }

  async findAllNotificationWithIdentity(): Promise<any> {
    return this.notificationRepository.find();
  }

  private isNotificationTypeEnabled(
      settings: NotificationSetting,
      type: NotificationType,
  ): boolean {
    if (settings.pause_all_notifications === true) {
      throw new BadRequestException('This user has paused all notifications');
    }
    switch (type) {
      case NotificationType.NEARBY_INFLUENCERS:
        return settings.nearby_influencers_passings;
      case NotificationType.NEARBY_BRANDS:
        return settings.nearby_brands_passings;
      case NotificationType.UNKNOWN_MESSAGES:
        return settings.messages_request;
      case NotificationType.MESSAGES:
        return settings.messages_from_users;
      default: return true; // Allow creating notifications for other types by default
    }
  }

  async updateNotificationSetting(
    id: string,
    updateNotificationSettingDto: UpdateNotificationSettingDto,
  ): Promise<NotificationSetting> {
    const setting = await this.notificationSettingRepository.findOne({where:{notification_setting_id:id}});
    Object.assign(setting, updateNotificationSettingDto);
    return this.notificationSettingRepository.save(setting);
  }

  async removeSetting(id: string): Promise<void> {
    const notificationSetting = await this.notificationSettingRepository.findOne({
      where: { notification_setting_id: id },
    });
    await this.notificationSettingRepository.remove(notificationSetting);
  }
}
