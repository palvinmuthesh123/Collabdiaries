import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {BaseCommonEntity} from '../../common/base.entity';
import {IdentityDetail} from "../../users/entity/identity-detail.entity";

@Entity('notification_settings')
export class NotificationSetting extends BaseCommonEntity {
  @PrimaryGeneratedColumn('uuid')
  notification_setting_id: string;

  @Column({ type: 'uuid',nullable:false })
  identity_id: string;

  // Notification Channel Preferences
  @Column({ type: 'boolean', default: false })
  email_notifications: boolean;

  @Column({ type: 'boolean', default: false })
  push_notifications: boolean;

  @Column({ type: 'boolean', default: true })
  in_app_notifications: boolean;

  // Specific Notification Categories
  @Column({ type: 'boolean', default: true })
  nearby_influencers_passings: boolean;

  @Column({ type: 'boolean', default: true })
  nearby_brands_passings: boolean;

  @Column({ type: 'boolean', default: true })
  messages_request: boolean;

  @Column({ type: 'boolean', default: true })
  messages_from_users: boolean;

  // Pause all notifications for this user
  @Column({ type: 'boolean', default: false })
  pause_all_notifications: boolean;

  // Daily notification limit
  @Column({ type: 'int', default: 0 })
  daily_limit: number;

  // Relationships
  @OneToOne(() => IdentityDetail, (identityDetail) => identityDetail.notificationSetting)
  @JoinColumn({ name: 'identity_id' })
  identity: IdentityDetail;
}
