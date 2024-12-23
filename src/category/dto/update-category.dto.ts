import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  category_name?: string; // Name of the category (optional)
}
