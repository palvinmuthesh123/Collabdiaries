import {IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID,} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {UserType} from "../../../common/enum";

export class CreateIdentityDetailDto {
  @ApiProperty({ description: 'UUID of the linked registration' })
  @IsUUID()
  registration_id: string;

  @ApiProperty({ description: 'User type of the identity detail', enum: UserType })
  @IsEnum(UserType)
  user_type: UserType;

  @ApiProperty({ description: 'Brand name associated with the identity detail' })
  @IsString()
  brand_name: string;

  @ApiProperty({ description: 'User name associated with the identity detail' })
  @IsString()
  user_name: string;

  @ApiProperty({ description: 'List of perks associated with the identity detail', type: [String] })
  @IsOptional()
  @IsArray()
  perks?: string[];

  @ApiProperty({ description: 'Description of the identity detail' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Budget associated with the identity detail' })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiProperty({ description: 'Currency associated with the budget' })
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty({ description: 'Profile image link of the identity detail' })
  @IsOptional()
  @IsString()
  profile_image?: string;

  @ApiProperty({ description: 'Is the identity detail currently online?' })
  @IsOptional()
  @IsBoolean()
  is_online?: boolean;

  @ApiProperty({ description: 'Web link associated with the identity detail' })
  @IsOptional()
  @IsString()
  weblink?: string;

  @ApiProperty({ description: 'Category IDs associated with the identity detail', type: [String] })
  @IsOptional()
  @IsArray()
  category_id?: string[];

  @ApiProperty({ description: 'Tag name associated with the identity detail' })
  @IsOptional()
  @IsString()
  tag_name?: string;

  @ApiProperty({ description: 'Referral code by which this identity was referred' })
  @IsOptional()
  @IsString()
  referral_by_code?: string;

  @ApiProperty({ description: 'QR code link associated with the identity detail' })
  @IsString()
  @IsNotEmpty()
  brand_home_page_url: string;
}
