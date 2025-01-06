import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MemberType} from "../../common/enum";
import {BaseCommonEntity} from "../../common/base.entity";


@Entity('member')
export class Member extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    member_id: string;

    @Column({ type: 'text', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', length: 255, nullable: true })
    desc?: string;

    @Column({ type: 'text', length: 255, nullable: true })
    profile_image?: string;

    @Column("simple-array", { default: [] })
    roles: string[];   // Specific role description (e.g., cameraman, sound_engineer etc.)

    @Column({ type: 'enum', enum: MemberType, nullable: false })
    type: MemberType;
}
