import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';

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
  requestStatus: string;
}
