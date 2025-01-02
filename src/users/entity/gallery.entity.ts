import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Registration} from "./registration.entity";
import {IdentityDetail} from "./identity-detail.entity";
import {GalleryType} from "../../common/enum";
import {BaseCommonEntity} from "../../common/base.entity";

@Entity('gallery')
export class Gallery extends BaseCommonEntity{
  @PrimaryGeneratedColumn('uuid')
  gallery_id: string;

  @Column({ type: 'uuid', nullable: true })
  identity_id: string;

  @Column({ type: 'uuid', nullable: true })
  registration_id: string;

  @Column({ type: 'enum', enum: GalleryType })
  type: GalleryType;

  @Column({ type: 'text', array: true, nullable: true })
  link: string[];

  // Relationships
  @ManyToOne(() => Registration, (registration) => registration.userGalleries)
  @JoinColumn({ name: 'registration_id' })
  registration: Registration;

  @ManyToOne(() => IdentityDetail, (identityDetail) => identityDetail.brandGalleries)
  @JoinColumn({ name: 'identity_id' })
  identityDetail: IdentityDetail;
}
