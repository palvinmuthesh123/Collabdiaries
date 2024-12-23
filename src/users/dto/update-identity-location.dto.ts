import { IsOptional, IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIdentityLocationDto {
  @ApiProperty()
  @IsOptional()
  identity_location_id?: string;

  @ApiProperty()
  @IsOptional()
  identity_id?: string;

  @ApiProperty()
  @IsOptional()
  registration_id?: string;

  @ApiProperty()
  @IsOptional()
  country_id?: string;

  @ApiProperty()
  @IsOptional()
  state_id?: string;

  @ApiProperty()
  @IsOptional()
  city_id?: string;

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
