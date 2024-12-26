import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {UserStatus} from "../users/entity/identity-detail.entity";

export class UpdateStatusDto {
    @ApiProperty()
    @IsEnum(UserStatus)
    status: UserStatus;
}

