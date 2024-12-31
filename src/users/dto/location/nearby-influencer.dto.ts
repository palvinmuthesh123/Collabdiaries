import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class NearbyBrandAndInfluencerDto {
    @ApiProperty({ description: 'Radius of the location' })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Radius must be a number' })
    radius: number;

    @ApiProperty({ description: 'Latitude of the location' })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Latitude must be a number' })
    userLat: number;

    @ApiProperty({ description: 'Longitude of the location' })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Longitude must be a number' })
    userLon: number;
}