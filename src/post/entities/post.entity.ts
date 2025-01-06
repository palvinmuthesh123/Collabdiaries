import {Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseCommonEntity} from "../../common/base.entity";
import {Page} from "../../page/entities/page.entity";
import {Product} from "../../product/entities/product.entity";

class TagLocation{
    @Column({ type: "varchar", length: 255, nullable: false })
    address: string;

    @Column({ type: "float", nullable: false })
    latitude: number;

    @Column({ type: "float", nullable: false })
    longitude: number;
}

export class PostEntity extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    post_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    date: string; // fix date format like 'dd-mm-yyy', 'yyy-mm-dd'

    @Column({ type: 'varchar', length: 255, nullable: true })
    desc?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    tag_Location: TagLocation;

    // @Column({ type: 'uuid', nullable: false })
    // diary_id: string;

    @Column({ type: 'uuid', nullable: false })
    page_id: string;

    @Column({ type: 'uuid', nullable: false })
    labels_id: string; // labels smaj nhi aa raha kya krna h iska
  // TODO =>  ADD COLUMN CUSTOM LINK

    // members uuid direct save
    @Column('uuid', { array: true, default: [] })
    members: string[];

    @Column({ type: 'boolean', default: true })
    is_public: boolean;

    // join relationship
    // @ManyToOne(() => Diary, (diary) => diary.posts)
    // @JoinColumn({ name: 'diary_id' })
    // diary: Diary;

    @ManyToOne(() => Page, (page) => page.posts)
    @JoinColumn({ name: 'page_id' })
    page: Page;
    // populated relation
    @OneToMany(() => Product, (post) => post.post)
    products: Product[];
}
