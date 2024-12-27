import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {NotificationMethod, NotificationType} from "../../common/enum";
import {BaseCommonEntity} from "../../common/base.entity";
import {IdentityDetail} from "../../users/entity/identity-detail.entity";

@Entity('notifications')
export class Notification extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    notification_id: string;

    @Column({ type: 'uuid' })
    identity_id: string;

    @Column({ type: 'enum', enum: NotificationType, nullable: false })
    type: NotificationType;

    @Column({ type: 'text', nullable: false })
    message: string;

    @Column({type:'enum',enum:NotificationMethod,default:NotificationMethod.in_app})
    method: NotificationMethod;

    // Relationships
    @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.identity_id)
    @JoinColumn({ name: 'identity_id' })
    identity: IdentityDetail;
}
