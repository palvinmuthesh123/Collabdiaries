import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseCommonEntity} from "../../common/base.entity";
import {PostEntity} from "../../post/entities/post.entity";

@Entity('product')
export class Product extends BaseCommonEntity {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'uuid', nullable: false })
    post_id: string;

    @Column({ type: 'text', nullable: true })
    desc?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    product_link: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    icon_url?: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    price: string;
    // join relationship
    @ManyToOne(() => PostEntity, (diary) => diary.products)
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;
}
