import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { State } from '../state/state.entity';
import { IdentityLocation } from '../users/entity/identity-location.entity';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn() // Auto-incrementing integer starting from 1
  country_id: number;

  @Column({ type: 'varchar' })
  country_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @OneToMany(() => State, (state) => state.country)
  state: State[];

  @OneToMany(
    () => IdentityLocation,
    (identitylocation) => identitylocation.country,
  )
  identitylocation: IdentityLocation[];
}
