import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Category } from '../../category/category.entity';
import { BrandMode, DealType, IdentityDetail } from '../entity/identity-detail.entity';
import { Registration } from '../entity/registration.entity';
import { Perks } from 'src/perks/perks.entity';

@Entity('branddetails')
export class BrandDetail {
  @PrimaryGeneratedColumn('uuid')
  brand_id: string;

  @Column({ type: 'uuid', nullable: true })
  identity_id: string;

  @Column({ type: 'uuid', nullable: true })
  registration_id: string;

  // Store category IDs as an array of UUIDs
  @Column('uuid', { array: true, nullable: true })
  category_id: string[];

  @Column({ type: 'boolean', default: false })
  barter: boolean;

  @Column({ type: 'boolean', default: false })
  paid: boolean;

  @Column({ type: 'enum', enum: BrandMode, nullable: true })
  brand_mode: BrandMode

  @Column({ type: 'text', default: '' })
  online_url: string

  @Column('uuid', { array: true, nullable: true })
  perks: string[];

  @Column({ type: 'text', default: '' })
  latitude: string

  @Column({ type: 'text', default: '' })
  longitude: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;

  // Relationships
  @ManyToOne(
    () => IdentityDetail,
    (identityDetail) => identityDetail.brandDetails,
    { nullable: true },
  )
  @JoinColumn({ name: 'identity_id' }) // Specify the foreign key column
  identityDetail: IdentityDetail;

  @ManyToOne(() => Registration, (registration) => registration.brandDetails, {
    nullable: true,
  })
  @JoinColumn({ name: 'registration_id' }) // Specify the foreign key column
  registration: Registration;

  // @ManyToMany(() => Perks, (registration) => registration.perks_id, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'perks' }) // Specify the foreign key column
  // perk: Perks;
}