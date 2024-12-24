import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { BrandMode } from '../entity/identity-detail.entity';

export class CreateBrandDetailDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  identity_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  registration_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsArray()
  category_id?: string[]; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  barter: boolean;
  
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  paid: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(BrandMode)
  brand_mode: BrandMode
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  online_url: string
  
  @ApiProperty()
  @IsOptional()
  @IsArray()
  perks: any[]
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  latitude: string
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  longitude: string
}