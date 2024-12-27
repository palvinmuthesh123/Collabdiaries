import {IsNotEmpty, IsUUID, IsString, IsNumber, IsEnum, IsOptional} from 'class-validator';
import {LinkType} from "../../common/enum";

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

  @IsOptional()
  @IsString()
  @IsEnum(LinkType)
  link_type: LinkType;

  @IsNotEmpty()
  @IsNumber()
  priority: number;
}
