import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity"; // Import the Page entity

@Entity('page_setting')
export class PageSetting extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    page_setting_id: string;

    @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
    page_color: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    page_name?: string;

    @Column('uuid', { array: true, default: [] })
    claimed_members: string[];

    @Column('uuid', { array: true, default: [] })
    added_members: string[];

    @Column({ type: 'text', nullable: true })
    about_post?: string;
}
