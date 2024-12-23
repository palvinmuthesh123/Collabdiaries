import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateSocialIdentityCountDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsNumber()
  follower_count: number;

  @IsOptional()
  @IsNumber()
  following_count?: number;

  @IsOptional()
  @IsNumber()
  engagement_rate?: number;
}
