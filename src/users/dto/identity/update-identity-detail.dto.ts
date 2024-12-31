import {IsArray, IsNumber, IsOptional, IsString,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateIdentityDetailDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  brand_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  perks?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  category_id?: string[];

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
  tag_name?: string;
}
