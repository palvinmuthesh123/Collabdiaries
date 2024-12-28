import {IsEnum, IsOptional, IsString, IsUUID} from 'class-validator';
import {ReportType} from '../../common/enum';

export class CreateReportDetailsDto {
    @IsUUID()
    reporter_id: string;

    @IsUUID()
    reported_id: string;

    @IsEnum(ReportType)
    type: ReportType;

    @IsString()
    @IsOptional()
    reason?: string;

    @IsOptional()
    @IsString()
    details?: string;
}


