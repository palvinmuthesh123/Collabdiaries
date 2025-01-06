import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity";

class PermissionGroup {
    @Column({ type: 'boolean', default: true })
    view: boolean;

    @Column({ type: 'boolean', default: true })
    contributions: boolean;
}

@Entity('diary_permission')
export class DiaryPermission extends BaseCommonEntity {
    @PrimaryGeneratedColumn('uuid')
    diary_permission_id: string;

    @Column({ type: 'uuid', nullable: false })
    diary_id: string;

    @Column(type => PermissionGroup)
    everyone: PermissionGroup;

    @Column(type => PermissionGroup)
    only_me: PermissionGroup;

    @Column(type => PermissionGroup)
    crew_members: PermissionGroup;

    @Column(type => PermissionGroup)
    followers: PermissionGroup;

    @Column(type => PermissionGroup)
    following: PermissionGroup;

    @Column(type => PermissionGroup)
    groups: PermissionGroup;

    @Column({ type: 'boolean', default: true })
    is_public: boolean;
}

//relations
// @ManyToOne(() => Diary, (diary) => diary.id, { onDelete: 'CASCADE' })
// @JoinColumn({ name: 'diary_id' })
// diary: Diary;