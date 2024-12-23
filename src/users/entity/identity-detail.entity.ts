import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BrandDetail } from '../entity/brand-detail.entity';
import { Registration } from '../entity/registration.entity';
import { IdentityLocation } from '../entity/identity-location.entity';
import { UserCoverPhoto } from '../entity/user-coverphoto.entity';
import { Bid } from '../../bidding/entity/bid.entity';
import { SocialIdentityCount } from '../../social/entity/social-identity-count.entity';
import { CollabIdentityCount } from '../../social/entity/collab-identity-count.entity';
import { CollabFollowingDetail } from '../../social/entity/collab-following-detail.entity';
import { SocialPost } from '../../social/entity/social-post.entity';
import { SocialLike } from '../../social/entity/social-like.entity';
import { SocialComment } from '../../social/entity/social-comment.entity';
import { Promotion } from '../../social/entity/promotion.entity';

export enum DealType {
  Barter = 'Barter',
  Paid = 'Paid',
  Unpaid = 'Unpaid',
}

export enum UserType {
  Brand = 'Brand',
  CollabUser = 'CollabUser',
}

@Entity('identitydetail')
export class IdentityDetail {
  @PrimaryGeneratedColumn('uuid')
  identity_id: string;

  @Column({ type: 'uuid' })
  registration_id: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.CollabUser })
  user_type: UserType;

  @Column({ length: 100, nullable: true })
  brand_name: string;

  @Column({ length: 100, nullable: true })
  user_name: string;

  @Column({ type: 'enum', enum: DealType, nullable: true })
  deal_type: DealType; // Enum for deal types

  @Column('uuid', { array: true, nullable: true })
  perks: string[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  budget: number;

  @Column({ type: 'text', nullable: true })
  currency: string;

  @Column({ length: 255, nullable: true })
  profile_pic: string;

  @Column({ type: 'boolean', default: false })
  is_online: boolean;

  @Column({ length: 100, nullable: true })
  tag_name: string;

  @Column({ length: 100, nullable: true })
  weblink: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => Registration,
    (registration) => registration.identityDetails,
    { nullable: true },
  )
  @JoinColumn({ name: 'registration_id' }) // Specify the foreign key column
  registration: Registration;

  @OneToMany(() => BrandDetail, (brandDetail) => brandDetail.identityDetail)
  brandDetails: BrandDetail[];

  @OneToMany(() => Bid, (bid) => bid.identityDetail)
  bid: Bid[];

  @OneToMany(() => Bid, (bid1) => bid1.identityDetail1)
  bid1: Bid[];

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

  @OneToMany(
    () => SocialComment,
    (socialComment) => socialComment.identityDetail,
  )
  socialComment: SocialComment[];

  @OneToMany(() => Promotion, (promotion) => promotion.identityDetail)
  promotion: Promotion[];

  @OneToMany(
    () => UserCoverPhoto,
    (userCoverPhoto) => userCoverPhoto.identityDetail,
  )
  userCoverPhoto: UserCoverPhoto[];

  @OneToMany(
    () => IdentityLocation,
    (identitylocation) => identitylocation.identity_detail,
  )
  identitylocation: IdentityLocation[];
}
