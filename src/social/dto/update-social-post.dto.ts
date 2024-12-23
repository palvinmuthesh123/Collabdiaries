import { IsOptional, IsUUID, IsString } from 'class-validator';

export class UpdateSocialPostDto {
  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsString()
  url?: string;
}
