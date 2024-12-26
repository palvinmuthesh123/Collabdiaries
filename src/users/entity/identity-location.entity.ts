import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IdentityDetail } from './identity-detail.entity';
import { Registration } from './registration.entity';
import { Country } from '../../country/country.entity';
import { State } from '../../state/state.entity';
import { City } from '../../city/city.entity';

@Entity('identitylocation')
export class IdentityLocation {
  @PrimaryGeneratedColumn('uuid')
  identity_location_id: string;

  @Column({ type: 'uuid', nullable: true })
  identity_id: string;

  @Column({ type: 'uuid', nullable: true })
  registration_id: string;

  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.identitylocation,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'identity_id' }) // Specify the foreign key column name
  identity_detail: IdentityDetail;

  @ManyToOne(
    () => Registration,
    (registration) => registration.identitylocation,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'registration_id' }) // Specify the foreign key column name
  registration: Registration;

  @ManyToOne(() => Country, (country) => country.identitylocation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' }) // Specify the foreign key column name
  country: Country;

  @ManyToOne(() => State, (state) => state.identitylocation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'state_id' }) // Specify the foreign key column name
  state: State;

  @ManyToOne(() => City, (city) => city.identitylocation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'city_id' }) // Specify the foreign key column name
  city: City;

  @Column({ type: 'text', nullable: true })
  flatno: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  landmark: string;

  @Column({ type: 'text', nullable: true })
  latitude: string;

  @Column({ type: 'text', nullable: true })
  country_id: string;

  @Column({ type: 'text', nullable: true })
  state_id: string;

  @Column({ type: 'text', nullable: true })
  city_id: string;

  @Column({ type: 'text', nullable: true })
  longitude: string;

  @Column({ type: 'boolean', default: true })
  is_current_location: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
