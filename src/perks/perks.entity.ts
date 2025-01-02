import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';
import {BaseCommonEntity} from "../common/base.entity";

@Entity('perks')
export class Perks extends BaseCommonEntity {
  @PrimaryGeneratedColumn('uuid')
  perk_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text',nullable:true })
  desc: string;
}
