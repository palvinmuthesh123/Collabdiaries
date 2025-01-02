import {IsBoolean, IsDateString, IsEmail, IsEnum, IsOptional, IsString,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {Gender} from "../../../common/enum";

export class UpdateRegistrationsDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsOptional()
  @IsString()
  user_name?: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ description: 'Date of birth' })
  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_gender_public?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_public?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_dateOfBirth_public?: boolean;
}