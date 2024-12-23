import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateCollabIdentityCountDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsNumber()
  follower_count: number;

  @IsOptional()
  @IsNumber()
  following_count?: number;
}
