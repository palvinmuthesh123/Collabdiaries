import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserType} from "../../../common/enum";

export class VerifyUsernameDto {
    @IsNotEmpty()
    @IsString()
    username:string

    @IsEnum(UserType)
    user_type: UserType;
}