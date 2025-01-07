import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({ description: 'Full address of the location' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Landmark near the location' })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ description: 'City of the location' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'State of the location' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Country of the location' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'Latitude of the location' })
  @IsOptional()
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude?: number;

  @ApiProperty({ description: 'Longitude of the location' })
  @IsOptional()
  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude?: number;
}
