import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegistrationsDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsOptional()
  @IsString()
  // @IsNotEmpty({ message: 'Name is required and cannot be empty' })
  name?: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsOptional()
  @IsString()
  // @IsNotEmpty({ message: 'Username is required and cannot be empty' })
  user_name?: string;

  @ApiProperty({ description: 'Mobile number of the user' })
  @IsOptional()
  @IsString()
  // @IsNotEmpty({ message: 'Mobile number is required and cannot be empty' })
  mobile_no?: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  // @IsNotEmpty({ message: 'Email is required and cannot be empty' })
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  // @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(['M', 'F', 'O'], { message: 'Gender must be M, F, or O' }) // Gender can be Male, Female, or Other
  gender?: 'M' | 'F' | 'O';

  @ApiProperty({ description: 'Date of birth' })
  @IsDateString({}, { message: 'Date of birth must be a valid date string' })
  // @IsNotEmpty({ message: 'Date of birth is required' })
  @IsOptional()
  dateOfBirth?: Date;

  // @ApiProperty({ description: 'Profile Picture' })
  // @IsOptional()
  // @IsString()
  // profile_pic?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_gender_public: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_public: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_dateOfBirth_public: boolean;
}