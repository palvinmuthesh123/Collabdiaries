import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IdentityDetail} from "../../users/entity/identity-detail.entity";

@Entity('identity_blocks')
export class IdentityBlock {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    blocker_id: string; // Identity who is blocking

    @Column({ type: 'uuid' })
    blocked_id: string; // Identity being blocked

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    // Relationships
    @ManyToOne(() => IdentityDetail, (identity) => identity.blockedUsers)
    @JoinColumn({ name: 'blocker_id' })
    blocker: IdentityDetail;

    @ManyToOne(() => IdentityDetail, (identity) => identity.blockingUsers)
    @JoinColumn({ name: 'blocked_id' })
    blocked: IdentityDetail;
}
