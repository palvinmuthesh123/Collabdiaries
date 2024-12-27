import {IsEnum, IsNotEmpty, IsUUID} from 'class-validator';
import {NotificationType} from "../../common/enum";

export class CreateNotificationDto {
    @IsUUID()
    @IsNotEmpty()
    identity_id: string;

    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @IsNotEmpty()
    message: string;
}
