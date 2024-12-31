import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { BidStatus } from 'src/common/enum';
import { DealType } from '../entity/bid.entity';

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
