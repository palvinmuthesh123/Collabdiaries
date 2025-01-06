import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsEnum
} from 'class-validator';
import { BidStatus, DealType } from 'src/common/enum';

export class UpdateNegotiationDto {
  @IsOptional()
  @IsUUID()
  bid_id?: string;

  @IsNotEmpty()
  @IsUUID()
  negoToUserId: string;

  @IsNotEmpty()
  @IsUUID()
  negoByUserId: string;

  @IsOptional()
  @IsArray()
  // @IsEnum(DealType, { each: true })
  // dealType: DealType[];
  dealType: string[];

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

  @IsNotEmpty()
  @IsString()
  requestStatus: BidStatus;
}
