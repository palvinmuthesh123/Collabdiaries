import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty()
  @IsOptional()
  country_name?: string; // Optional field
}
