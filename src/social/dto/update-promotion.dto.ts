import {IsOptional, IsUUID, IsString, IsNumber, IsEnum} from 'class-validator';
import {LinkType} from "../../common/enum";

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
  @IsEnum(LinkType)
  link_type: LinkType;

  @IsOptional()
  @IsString()
  type_id?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}
