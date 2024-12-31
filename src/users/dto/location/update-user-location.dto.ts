import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {LocationType} from "../../../common/enum";
import {LocationCommonArea} from "./update-brand-location.dto";

export class UpdateUserLocationDto extends LocationCommonArea{
    @ApiProperty({ description: 'UUID of the registration associated with this location' })
    @IsNotEmpty()
    @IsString()
    registration_id: string;

    @ApiProperty({description: 'Type of the location',})
    @IsNotEmpty({message:'locationType is required'})
    @IsEnum(LocationType)
    locationType:LocationType;
}