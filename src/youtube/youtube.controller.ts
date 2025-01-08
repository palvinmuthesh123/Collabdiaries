import { Controller, Get, Param, Query } from '@nestjs/common';
import { YouTubeService } from './youtube.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('youtube')
export class YouTubeController {
  constructor(private readonly youTubeService: YouTubeService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get youtube details' })
  async getStats(@Query('accessToken') accessToken: string) {
    return this.youTubeService.getYouTubeChannels(accessToken);
  }

  @Get('videos/:channelId')
  @ApiOperation({ summary: 'Get youtube videos' })
  async getChannelVideos(@Param('channelId') channelId: string) {
    return await this.youTubeService.getChannelVideos(channelId);
  }

  // Enganement Channel Api
  @Get('engagement/:channelId')
  @ApiOperation({ summary: 'Get youtube engagement' })
  async calculateEngagementRate(@Param('channelId') channelId: string) {
    return await this.youTubeService.calculateEngagementRate(channelId);
  }
}
