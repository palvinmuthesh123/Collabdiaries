import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty()
  @IsNotEmpty()
  // @IsUUID()
  state_id: string; // Required field, must be a valid UUID

  @ApiProperty()
  @IsOptional()
  city_name: string; // Required field
}
