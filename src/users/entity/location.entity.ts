import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from '../../common/base.entity';
import {LocationType, UserType} from "../../common/enum";
import {IdentityDetail} from "./identity-detail.entity";
import {Registration} from "./registration.entity";

@Entity('identity_location')
export class IdentityLocation extends BaseCommonEntity {
  @PrimaryGeneratedColumn('uuid')
  location_id: string;

  @Column({ type: 'uuid', nullable: true })
  identity_id: string;

  @Column({ type: 'uuid', nullable: true })
  registration_id: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.CollabUser })
  location_type: UserType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  landmark: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'enum', enum:LocationType, default:LocationType.permanent })
  locationType: LocationType

  // Relationships
  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.identitylocation, {nullable: false, onDelete: 'CASCADE',},)
  @JoinColumn({ name: 'identity_id' })
  identity_detail: IdentityDetail;

  @ManyToOne(() => Registration, (registration) => registration.identitylocation, {nullable: false, onDelete: 'CASCADE',},)
  @JoinColumn({ name: 'registration_id' })
  registration: Registration;
}
