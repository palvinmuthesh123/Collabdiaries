import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {LinkType, PromotionType} from "../../common/enum";

export class UpdatePromotionDto {
  @IsOptional()
  @IsUUID()
  identity_id?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  logo_details?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsEnum(PromotionType)
  type?: PromotionType;

  @IsOptional()
  @IsEnum(LinkType)
  link_type?: LinkType;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsBoolean()
  isBanner?: boolean;
}
