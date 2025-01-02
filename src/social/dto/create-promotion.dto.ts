import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {LinkType, PromotionType} from '../../common/enum';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsUUID()
  identity_id: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  logo_details?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsNotEmpty()
  @IsEnum(PromotionType)
  type: PromotionType;

  @IsNotEmpty()
  @IsEnum(LinkType)
  link_type: LinkType;

  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @IsOptional()
  @IsBoolean()
  isBanner?: boolean;
}
