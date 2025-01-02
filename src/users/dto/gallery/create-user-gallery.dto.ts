import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class CreateUserGalleryDto {
    @IsUUID()
    @IsNotEmpty({message:'registration_id is required'})
    @IsOptional()
    registration_id: string;

    @IsArray()
    @IsString({ each: true, message: 'Each link must be a string' })
    link: string[];
}