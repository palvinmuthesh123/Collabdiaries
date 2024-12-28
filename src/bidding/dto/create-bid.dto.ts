import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';
import { BidStatus } from 'src/common/enum';

export class CreateBidDto {
  @IsNotEmpty()
  @IsUUID()
  bidByUserId: string;

  @IsNotEmpty()
  @IsUUID()
  bidToUserId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  dealType: string[];

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
