import {CreateDateColumn, Entity, UpdateDateColumn} from 'typeorm';

@Entity('notification_settings')
export class BaseCommonEntity {

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
