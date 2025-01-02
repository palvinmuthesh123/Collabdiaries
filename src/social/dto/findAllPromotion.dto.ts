import {IsBoolean, IsOptional, IsString} from "class-validator";

export class FindAllPromotionDto {
    @IsString()
    @IsOptional()
    identity_id?:string
    @IsBoolean()
    @IsOptional()
    isHide?:boolean
}