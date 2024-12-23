import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePerksDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  perks_name?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsString()
  perks_desc?: string; // Optional field
}
