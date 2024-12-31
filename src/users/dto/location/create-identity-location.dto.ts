import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateIdentityLocationDto {
  @ApiProperty({ description: 'UUID of the identity associated with this location' })
  @IsOptional()
  @IsString()
  identity_id?: string;

  @ApiProperty({ description: 'UUID of the registration associated with this location' })
  @IsOptional()
  @IsString()
  registration_id?: string;

  @ApiProperty({ description: 'Full address of the location' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Landmark near the location' })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({ description: 'City of the location' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'State of the location' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Country of the location' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'Latitude of the location' })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number;

  @ApiProperty({ description: 'Longitude of the location' })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number;
}
