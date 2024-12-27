import {IsBoolean, IsInt, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateNotificationSettingDto {
    @IsBoolean()
    @IsNotEmpty()
    pause_all_notifications: boolean;

    @IsInt()
    @IsOptional()
    daily_limit: number;

    @IsBoolean()
    @IsOptional()
    nearby_influencers_passings: boolean;

    @IsBoolean()
    @IsOptional()
    nearby_brands_passings: boolean;

    @IsBoolean()
    @IsOptional()
    messages_request: boolean;

    @IsBoolean()
    @IsOptional()
    messages_from_users: boolean;

    @IsBoolean()
    @IsOptional()
    email_notifications: boolean;

    @IsBoolean()
    @IsOptional()
    push_notifications: boolean;

    @IsBoolean()
    @IsOptional()
    in_app_notifications: boolean;
}
