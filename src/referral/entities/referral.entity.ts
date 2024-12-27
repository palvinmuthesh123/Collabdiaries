import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity";
import {IdentityDetail} from "../../users/entity/identity-detail.entity";

@Entity('referrals')
export class ReferralDetails extends BaseCommonEntity {
    @PrimaryGeneratedColumn('uuid')
    referral_id: string;

    @Column({ type: 'uuid', nullable:false })
    identity_id: string;

    @Column({ type: 'varchar', nullable: true, default:null })
    referral_code?: string; // Unique referral code for this referral

    @Column({ type: 'varchar', nullable: true, default:null })
    qr_code_link?: string;

    @Column({ type: 'int', default: 0 })
    total_register: number;

    @Column({ type: 'int', default: 0 })
    total_brand: number;

    // Relationships
    @OneToOne(() => IdentityDetail, (identityDetail) => identityDetail.referral)
    @JoinColumn({ name: 'identity_id' })
    referral: IdentityDetail;
}
