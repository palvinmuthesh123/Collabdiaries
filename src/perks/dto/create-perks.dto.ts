import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  perks_name: string; // Required field

  @ApiProperty()
  @IsString()
  perks_desc?: string; // Optional field
}
