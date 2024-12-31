import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateRegistrationProfileDto {
    @ApiProperty({ description: 'Update user profile' })
    @IsNotEmpty()
    @IsString()
    profile_image: string;
}