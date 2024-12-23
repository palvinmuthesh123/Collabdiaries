import { IsOptional, IsUUID, IsString, IsNumber } from 'class-validator';

export class UpdatePromotionDto {
  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsString()
  label_name?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  image_detail?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  type_id?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}
