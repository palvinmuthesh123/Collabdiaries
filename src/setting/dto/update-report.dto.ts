import {IsEnum, IsOptional, IsString} from "class-validator";
import {ReportStatus} from "../../common/enum";

export class UpdateReportDetailsDto {
    @IsOptional()
    @IsEnum(ReportStatus)
    status?: ReportStatus;

    @IsOptional()
    @IsString()
    details?: string;
}