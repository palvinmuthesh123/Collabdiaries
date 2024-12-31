import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Bid} from '../../bidding/entity/bid.entity';
import {SocialIdentityCount} from '../../social/entity/social-identity-count.entity';
import {CollabIdentityCount} from '../../social/entity/collab-identity-count.entity';
import {CollabFollowingDetail} from '../../social/entity/collab-following-detail.entity';
import {SocialPost} from '../../social/entity/social-post.entity';
import {SocialLike} from '../../social/entity/social-like.entity';
import {SocialComment} from '../../social/entity/social-comment.entity';
import {Promotion} from '../../social/entity/promotion.entity';
import {Registration} from "./registration.entity";
import {IdentityLocation} from "./location.entity";
import {UserCoverPhoto} from "./user-coverphoto.entity";
import {UserStatus, UserType} from "../../common/enum";
import {NotificationSetting} from "../../notification/entities/notification-setting.entity";
import {IdentityBlock} from "../../setting/entities/user-block-setting.entity";
import {ReportDetails} from "../../setting/entities/report-setting.entity";
import {BaseCommonEntity} from "../../common/base.entity";

@Entity('identitydetail')
export class IdentityDetail extends BaseCommonEntity{
  @PrimaryGeneratedColumn('uuid')
  identity_id: string;

  @Column({ type: 'uuid' })
  registration_id: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.CollabUser })
  user_type: UserType;

  @Column({ length: 100, nullable: true })
  brand_name: string;

  @Column({ length: 100, nullable: true,unique:true })
  user_name: string;

  @Column({ type: 'text',array:true,nullable:true})
  deal_type: string[]

  @Column('uuid', { array: true, nullable: true })
  perks: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  budget: number;

  @Column({ type: 'text', nullable: true })
  currency: string;

  @Column({ length: 255, nullable: true })
  profile_image: string;

  @Column({type: 'json', nullable: true,})
  cover_image_details: {
    main_cover_image: string;
    cover_images: string[];
  };

  @Column({ type: 'boolean', default: false })
  is_online: boolean;

  @Column({ length: 100, nullable: true })
  weblink: string;

  @Column('uuid', { array: true, nullable: true })
  category_id: string[];

  @Column({ length: 100, nullable: true })
  tag_name: string;

  @Column({ length: 100, nullable: true,default:null })
  referral_by_code: string;

  @Column({ type: 'varchar', nullable: true })
  qr_code_link?: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.active })
  status: UserStatus;

  // Relationships

  @ManyToOne(() => Registration, (registration) => registration.identityDetails, { nullable: true },)
  @JoinColumn({ name: 'registration_id' }) // Specify the foreign key column
  registration: Registration;

  @OneToMany(() => Bid, (bid) => bid.identityDetail)
  bid: Bid[];

  @OneToMany(() => Bid, (bid1) => bid1.identityDetail1)
  bid1: Bid[];

  @OneToMany(() => SocialComment, (socialComment) => socialComment.identityDetail,)
  socialComment: SocialComment[];

  @OneToMany(() => Promotion, (promotion) => promotion.identityDetail)
  promotion: Promotion[];

  @OneToMany(() => UserCoverPhoto, (userCoverPhoto) => userCoverPhoto.identityDetail,)
  identityCoverPhotos: UserCoverPhoto[];

  @OneToMany(() => IdentityLocation, (identitylocation) => identitylocation.identity_detail,)
  identitylocation: IdentityLocation[];

  @OneToOne(() => NotificationSetting, (notificationSetting) => notificationSetting.identity, {
    cascade: true,
  })
  notificationSetting: NotificationSetting;

  @OneToMany(() => IdentityBlock, (block) => block.blocker)
  blockedUsers: IdentityBlock[];

  @OneToMany(() => IdentityBlock, (block) => block.blocked)
  blockingUsers: IdentityBlock[];

  @OneToMany(() => ReportDetails, (block) => block.reporter)
  reportedAccounts: ReportDetails[];

  @OneToMany(() => ReportDetails, (block) => block.reported)
  reportingAccounts: ReportDetails[];

  //======================================



  @OneToMany(
      () => SocialIdentityCount,
      (socialIdentityCount) => socialIdentityCount.identityDetail,
  )
  socialIdentityCount: SocialIdentityCount[];

  @OneToMany(
      () => CollabIdentityCount,
      (collabIdentityCount) => collabIdentityCount.identityDetail,
  )
  collabIdentityCount: CollabIdentityCount[];

  @OneToMany(
      () => CollabFollowingDetail,
      (collabFollowingDetail) => collabFollowingDetail.identityDetail,
  )
  collabFollowingDetail: CollabFollowingDetail[];

  @OneToMany(
      () => CollabFollowingDetail,
      (collabFollowingDetail) => collabFollowingDetail.identityDetail1,
  )
  collabFollowingDetail1: CollabFollowingDetail[];

  @OneToMany(() => SocialPost, (socialPost) => socialPost.identityDetail)
  socialPost: SocialPost[];

  @OneToMany(() => SocialLike, (socialLike) => socialLike.identityDetail)
  socialLike: SocialLike[];
}

