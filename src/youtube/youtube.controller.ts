import { Controller, Get, Param } from '@nestjs/common';
import { YouTubeService } from './youtube.service';

@Controller('youtube')
export class YouTubeController {
  constructor(private readonly youTubeService: YouTubeService) {}

  @Get('channel/:channelId')
  async getChannelData(@Param('channelId') channelId: string) {
    return await this.youTubeService.getChannelData(channelId);
  }

  @Get('videos/:channelId')
  async getChannelVideos(@Param('channelId') channelId: string) {
    return await this.youTubeService.getChannelVideos(channelId);
  }

  @Get('engagement/:channelId')
  async calculateEngagementRate(@Param('channelId') channelId: string) {
    return await this.youTubeService.calculateEngagementRate(channelId);
  }
}
