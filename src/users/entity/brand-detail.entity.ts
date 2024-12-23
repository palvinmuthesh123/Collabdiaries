import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/category.entity';
import { IdentityDetail } from '../entity/identity-detail.entity';
import { Registration } from '../entity/registration.entity';

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
}
