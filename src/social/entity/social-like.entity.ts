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
import { SocialPost } from './social-post.entity';

@Entity('social_like')
export class SocialLike {
  @PrimaryGeneratedColumn('uuid')
  like_id: string;

  @Column({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'text' })
  url: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.socialLike,
  )
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;

  @ManyToOne(() => SocialPost, (socialPost) => socialPost.socialLike)
  @JoinColumn({ name: 'post_id' })
  socialPost: SocialPost;
}
