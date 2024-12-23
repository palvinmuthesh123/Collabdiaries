import { IsOptional, IsUUID, IsString } from 'class-validator';

export class UpdateSocialCommentDto {
  @IsOptional()
  @IsUUID()
  post_id?: string;

  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
