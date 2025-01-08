import { Controller, Get, Param, Query } from '@nestjs/common';
import { YouTubeService } from './youtube.service';

@Controller('youtube')
export class YouTubeController {
  constructor(private readonly youTubeService: YouTubeService) {}

  @Get('stats')
  async getStats(@Query('accessToken') accessToken: string) {
    return this.youTubeService.getYouTubeChannels(accessToken);
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
