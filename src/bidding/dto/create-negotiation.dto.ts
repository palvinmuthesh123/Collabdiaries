import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { BidStatus, DealType } from 'src/common/enum';

export class CreateNegotiationDto {
  @IsNotEmpty()
  @IsUUID()
  bid_id: string;

  @IsNotEmpty()
  @IsUUID()
  negoToUserId: string;

  @IsNotEmpty()
  @IsUUID()
  negoByUserId: string;

  @IsNotEmpty()
  @IsArray()
  // @IsEnum(DealType, { each: true })
  // dealType: DealType[];
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
