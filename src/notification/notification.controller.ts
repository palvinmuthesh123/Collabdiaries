import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {UpdateNotificationSettingDto} from "./dto/update-notification-setting.dto";
import {NotificationSetting} from "./entities/notification-setting.entity";
import {ApiOperation} from "@nestjs/swagger";
import {CreateNotificationSettingDto} from "./dto/create-notification-setting.dto";

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Creating notification' })
  @Post('create')
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto,'xxx')
    return this.notificationService.createNotification(createNotificationDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get list of notifications with a particular identity' })
  @Get('list')
  async notificationList(@Body() payload: {identity_id?:string}) {
    return this.notificationService.notificationList(payload.identity_id);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get single notification' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete notification' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  // For notification-setting =======================================================

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Notification-setting , This end-point mainly not use' })
  @Post('setting/create')
  async createSetting(@Body() payload:CreateNotificationSettingDto):Promise<NotificationSetting>   {
    return this.notificationService.createSetting(payload);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get notification setting with a particular identity' })
  @Get('setting/list')
  async findAllNotificationSetting():Promise<NotificationSetting[]>   {
    return this.notificationService.findAllNotificationSetting();
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get notification setting with a particular identity' })
  @Get('setting/:id')
  async findOneNotificationSetting(@Param('id') id:string):Promise<NotificationSetting>   {
    return this.notificationService.findOneNotificationSetting(id);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updating notification setting' })
  @Put('setting/update/:id')
  async updateNotificationSetting(@Param('id') id: string, @Body() updateNotificationSettingDto: UpdateNotificationSettingDto): Promise<NotificationSetting> {
    return this.notificationService.updateNotificationSetting(id, updateNotificationSettingDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete notification setting' })
  @Delete('setting/:id')
  async removeSetting(@Param('id') id: string) {
    return this.notificationService.removeSetting(id);
  }
}
