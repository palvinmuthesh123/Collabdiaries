import {IsEnum, IsNotEmpty} from "class-validator";
import {ReportStatus} from "../../common/enum";

export class UpdateReportDetailsDto {
    @IsNotEmpty()
    @IsEnum(ReportStatus)
    status: ReportStatus;
}