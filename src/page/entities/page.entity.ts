import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PostEntity} from "../../post/entities/post.entity";
import {Diary} from "../../diary/entities/diary.entity";

@Entity('page')
export class Page {
    @PrimaryGeneratedColumn('uuid')
    page_id: string;

    @Column({ type: 'text', length: 255, nullable: false })
    date: string;

    @Column({ type: 'uuid', nullable: false })
    diary_id: string;

    @Column({ type: 'text', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', length: 255, nullable: true })
    description?: string;

    // join relation
    @ManyToOne(() => Diary, (diary) => diary.pages)
    @JoinColumn({ name: 'diary_id' })
    diary: Diary;

    // populate relationship
    @OneToMany(() => PostEntity, (post) => post.page)
    posts: PostEntity[];
}
