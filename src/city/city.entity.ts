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
import {State} from '../state/state.entity';
import {IdentityLocation} from '../users/entity/location.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn() // Auto-incrementing integer starting from 1
  city_id: number;

  @Column({ type: 'uuid' })
  state_id: string;

  @Column({ type: 'varchar' })
  city_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(() => State, (state) => state.city)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(
    () => IdentityLocation,
    (identitylocation) => identitylocation.city,
  )
  identitylocation: IdentityLocation[];
}
