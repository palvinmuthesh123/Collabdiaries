import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsOptional, IsString} from "class-validator";

export class UpdateRegistrationCoverImageDto{
    @ApiProperty({ description: 'Main cover image URL' })
    @IsOptional()
    @IsString()
    main_cover_image?: string;

    @ApiProperty({description: 'List of additional cover image URLs',})
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cover_images?: string[];
}