import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import {BrandDetail} from './brand-detail.entity';
import {IdentityDetail} from './identity-detail.entity';
import {UserCoverPhoto} from './user-coverphoto.entity';
import {IdentityLocation} from './identity-location.entity';
import {UserStatus} from "../../common/enum";

@Entity('registration')
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  registration_id: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, unique: true, nullable: true })
  user_name: string;

  @Column({ length: 15, unique: true })
  mobile_no: string;

  @Column({ length: 100, unique: true, nullable: true })
  email: string;

  // @Column({ length: 255, nullable: true })
  // profile_pic: string;

  @Column({ type: 'boolean', default: false })
  is_email_verified: boolean;

  @Column({ type: 'boolean', default: true })
  is_email_public: boolean;

  @Column({ type: 'char', length: 1, nullable: true })
  gender: 'M' | 'F' | 'O'; // Assuming gender can be Male, Female, or Other

  @Column({ type: 'boolean', default: true })
  is_gender_public: boolean;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'boolean', default: true })
  is_dateOfBirth_public: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  @Column({ type: 'boolean', default: false })
  is_blocked: boolean;

  @Column({ type: 'text', nullable: true })
  block_reason: string;

  @Column({ type: 'timestamp', nullable: true })
  blocked_at: Date;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.active })
  status: UserStatus;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  // Relationships
  @OneToMany(() => BrandDetail, (brandDetail) => brandDetail.registration)
  brandDetails: BrandDetail[];

  @OneToMany(
    () => UserCoverPhoto,
    (userCoverPhoto) => userCoverPhoto.registration,
  )
  userCoverPhoto: UserCoverPhoto[];

  @OneToMany(
    () => IdentityDetail,
    (identityDetail) => identityDetail.registration,
  )
  identityDetails: IdentityDetail[];

  @OneToMany(
    () => IdentityLocation,
    (identitylocation) => identitylocation.registration,
  )
  identitylocation: IdentityLocation[];

}