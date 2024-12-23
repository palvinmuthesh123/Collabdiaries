import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateSocialPostDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
