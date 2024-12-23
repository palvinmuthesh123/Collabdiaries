import { IsOptional, IsUUID, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserCoverPhotoDto {
  @ApiProperty()
  @IsUUID()
  identity_id: string; // Optional field

  @ApiProperty()
  @IsString()
  type: string; //STORE OR COVER

  @ApiProperty()
  @IsUUID()
  registration_id: string; // Optional field

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
