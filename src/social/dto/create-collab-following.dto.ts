import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateCollabFollowingDetailDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsUUID()
  following_id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
