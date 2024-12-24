import { IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiProperty()
  @IsOptional()
  // @IsUUID()
  state_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  city_name?: string; // Optional field
}
