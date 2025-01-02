import {IsArray, IsNotEmpty, IsString, IsUUID} from 'class-validator';

export class CreateBrandGalleryDto {
    @IsUUID()
    @IsNotEmpty({message:'identity_id is required'})
    identity_id: string;

    @IsArray()
    @IsString({ each: true, message: 'Each link must be a string' })
    link: string[];
}
