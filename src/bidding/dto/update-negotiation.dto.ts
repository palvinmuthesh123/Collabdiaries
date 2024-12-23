import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  IsNumber,
  IsNotEmpty
} from 'class-validator';

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
  requestStatus?: string;
}
