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
import { Negotiation } from './bid-negotiation.entity';
import { IdentityDetail } from '../../users/entity/identity-detail.entity';

@Entity('bid')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  bid_id: string;

  @Column({ type: 'uuid' })
  bidByUserId: string;

  @Column({ type: 'uuid' })
  bidToUserId: string;

  @Column({ type: 'varchar', array: true })
  dealType: string[];

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', array: true })
  perks: string[];

  @Column({ type: 'text' })
  requestStatus: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @OneToMany(() => Negotiation, (negotiation) => negotiation.bid)
  negotiation: Negotiation[];

  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.bid1)
  @JoinColumn({ name: 'bidByUserId' })
  identityDetail: IdentityDetail;

  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.bid)
  @JoinColumn({ name: 'bidToUserId' })
  identityDetail1: IdentityDetail;
}
