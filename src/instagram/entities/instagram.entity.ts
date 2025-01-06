import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instagram_tokens')
export class InstagramToken {
  @PrimaryGeneratedColumn('uuid')
  instagram_token: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  userId: string;

  @Column({ type: 'text', nullable: false })
  accessToken: string;

  @Column({ type: 'timestamp', nullable: false })
  expirationTime: Date;
}
