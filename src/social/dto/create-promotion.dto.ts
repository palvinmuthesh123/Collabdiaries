import { IsNotEmpty, IsUUID, IsString, IsNumber } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsString()
  label_name: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  image_detail: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  type_id: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
}
