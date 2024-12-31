import { IsNotEmpty, IsUUID, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSocialIdentityCountDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsNumber()
  follower_count: number;

  @IsOptional()
  @IsNumber()
  following_count: number;

  @IsOptional()
  @IsNumber()
  engagement_rate: number;

  @IsOptional()
  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  access_token: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  name: string;

}
