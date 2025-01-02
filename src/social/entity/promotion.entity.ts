import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {LinkType, PromotionType} from "../../common/enum";
import {IdentityDetail} from "../../users/entity/identity-detail.entity";

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  promotion_id: string;

  @Column({ type: 'uuid' })
  identity_id: string;

  @Column({ type: 'text' })
  label: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'text',nullable:true })
  logo_details?: string;

  @Column({ type: 'text',nullable:true })
  cover_image?: string;

  @Column({ type: 'enum',enum:PromotionType })
  type: PromotionType;

  @Column({type: 'enum',enum: LinkType})
  link_type: LinkType;

  @Column({ type: 'numeric' })
  priority: number;

  @Column({ type: 'boolean',default:false })
  isBanner: boolean;

  @Column({ type: 'boolean',default:false })
  isHide: boolean;

  // Relationships
  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.promotions)
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;
}
