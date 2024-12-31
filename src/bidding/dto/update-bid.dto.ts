import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { BidStatus } from 'src/common/enum';
import { DealType } from '../entity/bid.entity';

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
