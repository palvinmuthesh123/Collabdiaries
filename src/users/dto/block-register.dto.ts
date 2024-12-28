import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class BlockRegisterDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    register_id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    reason?: string


}