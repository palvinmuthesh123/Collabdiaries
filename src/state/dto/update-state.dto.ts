import { IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStateDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  country_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  state_name?: string; // Optional field
}
