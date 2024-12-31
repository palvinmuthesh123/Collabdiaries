import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ length: 100 })
  category_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
