import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateBlockIdentityDto {
    @IsUUID()
    @IsNotEmpty()
    blocker_id: string;

    @IsUUID()
    @IsNotEmpty()
    blocked_id: string;
}