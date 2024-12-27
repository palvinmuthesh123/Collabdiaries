import {IsNotEmpty, IsUUID} from 'class-validator';

export class CreateNotificationSettingDto {
    @IsUUID()
    @IsNotEmpty()
    identity_id: string;
}
