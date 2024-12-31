import {Column, CreateDateColumn, Entity, UpdateDateColumn} from 'typeorm';

@Entity('notification_settings')
export class BaseCommonEntity {

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date: Date;

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;
}
