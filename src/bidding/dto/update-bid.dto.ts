import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';
import { BidStatus } from 'src/common/enum';

export class UpdateBidDto {
  @IsOptional()
  @IsUUID()
  bidByUserId?: string;

  @IsOptional()
  @IsUUID()
  bidToUserId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dealType?: string[];

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
