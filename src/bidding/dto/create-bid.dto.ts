import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { BidStatus, DealType } from 'src/common/enum';

export class CreateBidDto {
  @IsNotEmpty()
  @IsUUID()
  bidByUserId: string;

  @IsNotEmpty()
  @IsUUID()
  bidToUserId: string;

  // @IsNotEmpty()
  // @IsArray()
  // @IsString({ each: true })
  // dealType: string[];

  @IsNotEmpty()
  @IsArray()
  @IsEnum(DealType)
  dealType?: DealType;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  perks: string[];

  @IsNotEmpty()
  @IsString()
  requestStatus: BidStatus;
}
