import { IsOptional, IsUUID, IsString, IsBoolean } from 'class-validator';

export class UpdateCollabFollowingDetailDto {
  @IsOptional()
  @IsUUID()
  collab_following_detail_id: string;

  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsUUID()
  following_id?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
