import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {SettingService} from "./setting.service";
import {CreateBlockIdentityDto} from "./dto/create-block-identity.dto";
import {IdentityBlock} from "./entities/user-block-setting.entity";
import {CreateReportDetailsDto} from "./dto/create-report.dto";
import {UpdateReportDetailsDto} from "./dto/update-report.dto";

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('block/user')
  async blockUser(@Body() payload:CreateBlockIdentityDto):Promise<{message:string}> {
    await this.settingService.blockUser(payload);
    return { message: 'User blocked successfully' };
  }

  @Post('unblock/user')
  async unblockUser(
      @Body() { blocker_Id, blocked_Id }: { blocker_Id: string; blocked_Id: string },
  ):Promise<{message:string}> {
    await this.settingService.unblockUser(blocker_Id, blocked_Id);
    return { message: 'User unblocked successfully' };
  }

  @Get('blocked/users/:blockerId')
  async getBlockedUsers(@Param('blockerId') blockerId: string):Promise<IdentityBlock[]> {
    return await this.settingService.getBlockedUsers(blockerId);
  }

  //Report Basic logic ===============================

  @Post('report')
  async create(@Body() createDto: CreateReportDetailsDto) {
    return this.settingService.create(createDto);
  }

  @Get('reports/list')
  async findAll() {
    return this.settingService.findAll();
  }

  @Get('report/:id')
  async findOne(@Param('id') id: string) {
    return this.settingService.findOne(id);
  }

  @Put('report/update/:id')
  async updateReportStatus(@Param('id') id: string, @Body() updateDto: UpdateReportDetailsDto) {
    return this.settingService.updateReportStatus(id, updateDto);
  }

  @Delete('report:id')
  async remove(@Param('id') id: string) {
    await this.settingService.remove(id);
    return { message: `Report with ID ${id} deleted successfully` };
  }
}
