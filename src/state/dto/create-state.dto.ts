import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty()
  // @IsUUID()
  @IsNotEmpty()
  country_id: string; // Required field

  @ApiProperty()
  @IsNotEmpty()
  state_name: string; // Required field
}
