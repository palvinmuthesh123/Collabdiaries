import { IsOptional, IsUUID, IsNumber } from 'class-validator';

export class UpdateCollabIdentityCountDto {
  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsNumber()
  follower_count?: number;

  @IsOptional()
  @IsNumber()
  following_count?: number;
}
