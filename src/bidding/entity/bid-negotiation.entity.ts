import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BidStatus } from 'src/common/enum';
import { Bid } from './bid.entity';

@Entity('negotiation')
export class Negotiation {
  @PrimaryGeneratedColumn('uuid')
  negotiation_id: string;

  @Column({ type: 'uuid' })
  bid_id: string;

  @Column({ type: 'uuid' })
  negoByUserId: string;

  @Column({ type: 'uuid' })
  negoToUserId: string;

  // @Column({ type: 'enum', enum: DealType, array: true })
  // dealType: DealType[];

  @Column({ type: 'varchar', array: true })
  dealType: string[];

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
  @ManyToOne(() => Bid, (bid) => bid.negotiation)
  @JoinColumn({ name: 'bid_id' })
  bid: Bid;
}
