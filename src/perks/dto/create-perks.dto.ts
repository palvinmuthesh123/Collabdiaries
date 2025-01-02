import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreatePerksDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string; // Required field

  @ApiProperty()
  @IsString()
  desc?: string; // Optional field
}
