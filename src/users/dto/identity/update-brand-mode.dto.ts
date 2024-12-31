import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateBrandModeDto{
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_online: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    weblink?: string;
}