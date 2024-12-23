import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IdentityDetail } from '../../users/entity/identity-detail.entity';
import { SocialLike } from './social-like.entity';
import { SocialComment } from './social-comment.entity';

@Entity('social_post')
export class SocialPost {
  @PrimaryGeneratedColumn('uuid')
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
    (identityDetail) => identityDetail.socialPost,
  )
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;

  @OneToMany(() => SocialLike, (socialLike) => socialLike.socialPost)
  socialLike: SocialLike[];

  @OneToMany(() => SocialComment, (socialComment) => socialComment.socialPost)
  socialComment: SocialComment[];
}
