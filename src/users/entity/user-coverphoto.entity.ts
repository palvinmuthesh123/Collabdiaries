import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Registration} from "./registration.entity";
import {IdentityDetail} from "./identity-detail.entity";

@Entity('userCoverPhoto')
export class UserCoverPhoto {
  @PrimaryGeneratedColumn('uuid')
  cover_photos_id: string;

  @Column({ type: 'uuid', nullable: true })
  identity_id: string;

  @Column({ type: 'text', nullable: true })
  type: string; //STORE OR COVER

  @Column({ type: 'uuid', nullable: true })
  registration_id: string;

  @Column({ type: 'text', array: true, nullable: true })
  link: string[];

  @Column({ type: 'text', nullable: true })
  main_cover_photo_link: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(() => Registration, (registration) => registration.userCoverPhotos)
  @JoinColumn({ name: 'registration_id' }) // Specify the foreign key column
  registration: Registration;

  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.identityCoverPhotos,
  )
  @JoinColumn({ name: 'user_identity_id' }) // Specify the foreign key column
  identityDetail: IdentityDetail;
}
