import {IsString, IsUUID} from 'class-validator';

export class UpdateBrandOwnershipDto {
    @IsUUID()
    @IsString()
    brand_identity_id:string;
    @IsUUID()
    @IsString()
    new_owner_identity_id: string;
}