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

@Entity('collab_following_detail')
export class CollabFollowingDetail {
  @PrimaryGeneratedColumn('uuid')
  collab_following_detail_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'uuid' })
  following_id: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.collabFollowingDetail,
  )
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;

  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.collabFollowingDetail1,
  )
  @JoinColumn({ name: 'following_id' })
  identityDetail1: IdentityDetail;
}
