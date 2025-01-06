import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity";
import {Page} from "../../page/entities/page.entity";

@Entity('diary') //
export class Diary extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    diary_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'uuid', nullable: false })
    registration_id: string;

    @Column({ type: 'uuid', nullable: false })
    identity_id: string;

    @Column({ type: 'boolean', default: true })
    is_public: boolean;

    //relationship
    @OneToMany(() => Page, (post) => post.diary)
    pages: Page[];
}
