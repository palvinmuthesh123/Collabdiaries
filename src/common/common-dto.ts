import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {UserStatus} from "./enum";

export class UpdateStatusDto {
    @ApiProperty()
    @IsEnum(UserStatus)
    status: UserStatus;
}

