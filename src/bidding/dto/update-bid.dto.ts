import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BidStatus, DealType } from 'src/common/enum';

export class UpdateBidDto {
  @IsOptional()
  @IsUUID()
  bidByUserId?: string;

  @IsOptional()
  @IsUUID()
  bidToUserId?: string;

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // dealType?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(DealType)
  dealType?: DealType;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  perks?: string[];

  @IsOptional()
  @IsString()
  requestStatus?: BidStatus;
}
