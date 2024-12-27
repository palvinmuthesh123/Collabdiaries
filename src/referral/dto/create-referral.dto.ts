import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class CreateReferralDto {
    @IsUUID()
    @IsNotEmpty()
    identity_id: string;

    @IsString()
    @IsOptional()
    brand_home_page_url?: string;

    @IsString()
    @IsOptional()
    user_home_page_url?: string;
}
