import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {IdentityDetail, UserType} from '../../users/entity/identity-detail.entity';
import {LinkType} from "../../common/enum";

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  promotion_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'text' })
  label_name: string;

  @Column({ type: 'text' })
  link: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'text' })
  image_detail: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  type_id: string;

  @Column({
    type: 'enum',
    enum: LinkType,
    nullable: true, // Allows null values
  })
  link_type: LinkType;

  @Column({ type: 'numeric' })
  priority: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.promotion)
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;
}
