// export class Entity {}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IdentityDetail } from '../../users/entity/identity-detail.entity';
import { Gallery } from '../../users/entity/gallery.entity';
import { GroupStatus } from '../dto/create-group.dto';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_id: string;

  @Column({ length: 100, nullable: true })
  name?: string;

  @Column({ length: 255, nullable: true })
  group_image?: string;

  @Column({ type: 'boolean', default: false })
  is_deleted?: boolean;

  @Column({ type: 'enum', enum: GroupStatus, default: GroupStatus.active })
  status: GroupStatus;

  @Column({ type: 'uuid', array: true })
  identity_id: string[];

  @Column({ type: 'uuid' })
  created_by: string;

  // Relationships
  @OneToMany(() => Gallery, (userGallery) => userGallery.registration)
  userGalleries: Gallery[];

  @OneToMany(
    () => IdentityDetail,
    (identityDetail) => identityDetail.registration,
  )
  identityDetails: IdentityDetail[];

  // @ManyToMany(() => IdentityDetail, (identityDetail) => identityDetail.registration)
  // identityDetail: IdentityDetail[];

  // @OneToMany(() => IdentityLocation, (identitylocation) => identitylocation.registration)
  // identitylocation: IdentityLocation[];
}
