import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class CreateReferralDto {
    @IsUUID()
    @IsNotEmpty()
    identity_id: string;

    @IsString()
    @IsOptional()
    url?: string;
}
