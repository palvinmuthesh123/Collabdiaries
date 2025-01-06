import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
