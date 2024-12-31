import {IsNotEmpty, IsString, IsUUID} from 'class-validator';

export class UpdateBrandOwnershipDto {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    identity_id:string;
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    new_owner_registration_id: string;
}