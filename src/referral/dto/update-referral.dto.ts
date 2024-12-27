import {PartialType} from '@nestjs/swagger';
import {CreateReferralDto} from './create-referral.dto';
import {IsInt, IsOptional} from "class-validator";

export class UpdateReferralDto extends PartialType(CreateReferralDto) {
    @IsOptional()
    @IsInt()
    total_register?: number;
    @IsOptional()
    @IsInt()
    total_brand?: number;
}
