import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum GroupStatus {
    active='active',
    reported='reported',
    archived='archived',
    deleted='deleted'
}

export class CreateGroupDto {
    // @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name?: string;

    // @ApiProperty()
    @IsOptional()
    @IsString()
    group_image?: string;

    // @ApiProperty()
    @IsBoolean()
    is_deleted?: boolean;

    // @ApiProperty()
    @IsEnum(GroupStatus)
    status: GroupStatus;

    // @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    identity_ids: string[];
    
    @IsNotEmpty()
    @IsUUID()
    created_by: string;
}
