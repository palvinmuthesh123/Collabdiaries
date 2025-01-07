import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Negotiation } from './bid-negotiation.entity';
import { IdentityDetail } from '../../users/entity/identity-detail.entity';
import { BidStatus, DealType } from 'src/common/enum';

@Entity('bid')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  bid_id: string;

  @Column({ type: 'uuid' })
  bidByUserId: string;

  @Column({ type: 'uuid' })
  bidToUserId: string;

  @Column({ type: 'enum', enum: DealType, nullable: true, array: true })
  dealType: DealType;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', array: true })
  perks: string[];

  @Column({ type: 'enum', enum: BidStatus, default: BidStatus.received })
  requestStatus: BidStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @OneToMany(() => Negotiation, (negotiation) => negotiation.bid)
  negotiation: Negotiation[];

  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.bid, {
    eager: true,
  })
  @JoinColumn({ name: 'bidByUserId' })
  identityDetail: IdentityDetail;

  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.bid1, {
    eager: true,
  })
  @JoinColumn({ name: 'bidToUserId' })
  identityDetail1: IdentityDetail;
}
