import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity";

@Entity('diary-setting') //
export class DiarySetting extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    diary_setting_id: string;

    @Column({ type: 'uuid', nullable: false })
    diary_id: string;
}
