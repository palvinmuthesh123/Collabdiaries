import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateDealTypeDto{
    @ApiProperty()
    @IsArray()
    @IsString({each:true})
    @IsNotEmpty()
    deal_type: string[];
}