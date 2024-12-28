import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IdentityDetail } from '../../users/entity/identity-detail.entity';

@Entity('social_identity_count')
export class SocialIdentityCount {
  @PrimaryGeneratedColumn('uuid')
  social_identity_count_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'numeric' })
  follower_count: number;

  @Column({ type: 'numeric', nullable: true })
  following_count: number;

  @Column({ type: 'numeric', nullable: true })
  engagement_rate: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.socialIdentityCount,
  )
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;
}