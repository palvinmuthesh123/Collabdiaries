import {IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class BlockRegisterDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    reason?: string
}