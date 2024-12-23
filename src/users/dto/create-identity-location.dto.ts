import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIdentityLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  identity_id: string;

  @ApiProperty()
  @IsNotEmpty()
  registration_id: string;

  @ApiProperty()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty()
  @IsNotEmpty()
  state_id: string;

  @ApiProperty()
  @IsNotEmpty()
  city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  flatno?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_current_location?: boolean;
}
