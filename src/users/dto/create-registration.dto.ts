import {IsBoolean, IsDateString, IsEmail, IsEnum, IsOptional, IsString,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateRegistrationsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  mobile_no: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // profile_pic?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['M', 'F', 'O']) // Gender can be Male, Female, or Other
  gender?: 'M' | 'F' | 'O';

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_gender_public: boolean;

  @ApiProperty()
  @IsDateString() // Validate that the date is in the correct format
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_email_public: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  is_dateOfBirth_public: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referral_code?:string
}
