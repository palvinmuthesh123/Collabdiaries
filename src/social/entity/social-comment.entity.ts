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

@Entity('social_comment')
export class SocialComment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({ type: 'uuid' })
  post_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.socialComment,
  )
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;

  @ManyToOne(() => SocialPost, (socialPost) => socialPost.socialComment)
  @JoinColumn({ name: 'post_id' })
  socialPost: SocialPost;
}
