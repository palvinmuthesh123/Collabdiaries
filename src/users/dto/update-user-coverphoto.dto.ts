import { IsOptional, IsUUID, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCoverPhotoDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  identity_id?: string; // Optional field

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string; //STORE OR COVER // Optional field

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  registration_id?: string; // Optional field

  @ApiProperty()
  @IsArray()
  @IsString({ each: true }) // Ensures every element in the array is a string
  @IsOptional()
  link?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  main_cover_photo_link?: string;
}
