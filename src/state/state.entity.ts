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
import { Country } from '../country/country.entity';
import { City } from '../city/city.entity';
import { IdentityLocation } from '../users/entity/identity-location.entity';

@Entity('state')
export class State {
  @PrimaryGeneratedColumn() // Auto-incrementing integer starting from 1
  state_id: number;

  @Column({ type: 'uuid' })
  country_id: string;

  @Column({ type: 'varchar' })
  state_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(() => Country, (country) => country.state)
  @JoinColumn({ name: 'country_id' }) // Specify the foreign key column
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  city: City[];

  @OneToMany(
    () => IdentityLocation,
    (identitylocation) => identitylocation.state,
  )
  identitylocation: IdentityLocation[];
}
