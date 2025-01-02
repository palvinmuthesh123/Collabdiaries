import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCommonEntity} from "../../common/base.entity";
import {IdentityDetail} from "../../users/entity/identity-detail.entity";
import {ReportStatus, ReportType} from "../../common/enum";

@Entity('report')
export class ReportDetails extends BaseCommonEntity{
    @PrimaryGeneratedColumn('uuid')
    report_id: string;

    @Column({ type: 'uuid' })
    reporter_id: string;

    @Column({ type: 'uuid' })
    reported_id: string;

    @Column({ type: 'enum', enum: ReportType })
    type: ReportType;

    @Column({ type: 'text' })
    reason: string;

    @Column({ type: 'text', nullable: true })
    desc?: string;

    @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.Pending })
    status: ReportStatus;

    // Relationships
    @ManyToOne(() => IdentityDetail, (identity) => identity.reportedAccounts)
    @JoinColumn({ name: 'reporter_id' })
    reporter: IdentityDetail;

    @ManyToOne(() => IdentityDetail, (identity) => identity.reportingAccounts)
    @JoinColumn({ name: 'reported_id' })
    reported: IdentityDetail;
}
