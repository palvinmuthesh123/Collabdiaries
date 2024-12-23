import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsEnum,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { UserType, DealType } from '../entity/identity-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIdentityDetailDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  registration_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserType)
  user_type?: UserType; // Required field for user type

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(DealType)
  deal_type?: DealType; // Required field for deal type

  @ApiProperty()
  @IsOptional()
  @IsArray()
  perks?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profile_pic?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_online?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tag_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  weblink?: string;
}
