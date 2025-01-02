import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {IdentityDetail} from './identity-detail.entity';
import {Gallery} from './gallery.entity';
import {IdentityLocation} from './location.entity';
import {Gender, UserStatus} from "../../common/enum";
import {BaseCommonEntity} from "../../common/base.entity";

@Entity('registration')
export class Registration extends BaseCommonEntity{
  @PrimaryGeneratedColumn('uuid')
  registration_id: string;

  @Column({ length: 100, nullable: true })
  name?: string;

  //TODO=> NULLABLE REMOVE KRNA H
  @Column({ length: 100, unique: true, nullable: true })
  full_name?: string;

  @Column({ length: 100, unique: true, nullable: true })
  user_name?: string;

  @Column({ length: 15, unique: true })
  mobile_no: string;

  @Column({ length: 100, unique: true, nullable: true })
  email?: string;

  @Column({ type: 'boolean', default: false })
  is_email_verified: boolean;

  @Column({ type: 'boolean', default: true })
  is_email_public: boolean;

  @Column({ length: 255, nullable: true })
  profile_image?: string;

  @Column({type: 'json', nullable: true,})
  cover_image_details: {
    main_cover_image: string;
    cover_images: string[];
  };

  @Column({ type: 'enum', enum:Gender, default:Gender.other })
  gender: Gender

  @Column({ type: 'boolean', default: true })
  is_gender_public: boolean;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'boolean', default: true })
  is_dateOfBirth_public: boolean;

  @Column({ type: 'boolean', default: false })
  is_blocked?: boolean;

  @Column({ type: 'text', nullable: true,default:null })
  block_reason?: string;

  @Column({ type: 'text', nullable: true,default:null })
  referral_code?: string;

  @Column({ type: 'int', default: 0 })
  total_user_by_referral: number;

  @Column({ type: 'int', default: 0 })
  total_brand_by_referral: number;

  @Column({ type: 'timestamp', nullable: true ,default:null })
  blocked_at?: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.active })
  status: UserStatus;

  // Relationships
  @OneToMany(
    () => Gallery, (userGallery) => userGallery.registration)
  userGalleries: Gallery[];

  @OneToMany(() => IdentityDetail, (identityDetail) => identityDetail.registration)
  identityDetails: IdentityDetail[];

  @OneToMany(() => IdentityLocation, (identitylocation) => identitylocation.registration)
  identitylocation: IdentityLocation[];
}