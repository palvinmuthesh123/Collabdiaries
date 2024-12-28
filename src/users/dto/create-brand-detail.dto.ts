import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { BrandMode } from '../entity/identity-detail.entity';

export class CreateBrandDetailDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID('4', { message: 'The ID must be a valid UUIDv4' })
  identity_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID('4', { message: 'The ID must be a valid UUIDv4' })
  registration_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({ message: 'Category ID must be an array of strings' })
  category_id?: string[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'Barter must be a boolean value' })
  barter: boolean;
  
  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'Paid must be a boolean value' })
  paid: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Brand mode must be a string' })
  @IsEnum(BrandMode, { message: `Brand mode must be one of the following values: ${Object.values(BrandMode).join(', ')}` })
  brand_mode: BrandMode
  
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Online URL must be a string' })
  online_url: string
  
  @ApiProperty()
  @IsOptional()
  @IsArray({ message: 'Perks must be an array' })
  perks: any[]
  
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Latitude must be a string' })
  latitude: string
  
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Longitude must be a string' })
  longitude: string
}