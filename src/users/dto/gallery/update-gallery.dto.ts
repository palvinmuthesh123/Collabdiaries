import {IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {GalleryType} from "../../../common/enum";

export class UpdateGalleryDto {
    @IsUUID()
    @IsOptional()
    identity_id?: string;

    @IsUUID()
    @IsOptional()
    registration_id?: string;

    @IsEnum(GalleryType, { message: 'type must be a valid GalleryType' })
    @IsNotEmpty({message:'Gallery type is required'})
    type: GalleryType;

    @IsArray()
    @IsString({ each: true, message: 'Each link must be a string' })
    @IsNotEmpty()
    links: string[];
}
