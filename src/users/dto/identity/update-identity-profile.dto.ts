import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateIdentityProfileDto {
    @ApiProperty({ description: 'Profile image link of the identity detail' })
    @IsString()
    @IsNotEmpty()
    profile_image: string;
}