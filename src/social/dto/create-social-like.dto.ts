import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateSocialLikeDto {
  @IsNotEmpty()
  @IsUUID()
  post_id: string;

  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
