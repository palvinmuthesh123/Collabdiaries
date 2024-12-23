import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDetailDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  identity_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  registration_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsArray()
  category_id?: string[]; // Optional field
}
