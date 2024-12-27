import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

@Entity('perks')
export class Perks {
  @PrimaryGeneratedColumn('uuid')
  perks_id: string;

  @Column({ type: 'char', nullable:true })
  perks_name: string;

  @Column({ type: 'text' })
  perks_desc: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
