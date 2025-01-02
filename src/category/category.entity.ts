import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';
import {BaseCommonEntity} from "../common/base.entity";

@Entity('category')
export class Category extends BaseCommonEntity{
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ length: 100 })
  name: string;
}
