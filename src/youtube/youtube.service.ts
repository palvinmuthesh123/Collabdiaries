import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { lastValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class YouTubeService {
  constructor(private readonly httpService: HttpService) {}
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly apiKey = 'AIzaSyBDBnmdYW4RoSmH1QBAlZUT9L6rdbKXmH0';

  async getYouTubeChannels(accessToken: string) {
    // YouTube API endpoint to get the authenticated user's channel details
    const url =
      'https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true';
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );
      const channel = response.data.items[0];
      const channelId = channel.id;
      const { title, description } = channel.snippet;
      const { viewCount, subscriberCount, videoCount } = channel.statistics;
      return {
        channelId,
        title,
        description,
        viewCount,
        subscriberCount,
        videoCount,
      };
    } catch (error) {
      console.error('Error fetching YouTube channel details:', error);
      throw error;
    }
  }

  // Fetch channel videos and separate shorts and longs
  async getChannelVideos(channelId: string) {
    const searchUrl = `${this.baseUrl}/search?part=id&channelId=${channelId}&maxResults=50&type=video&key=${this.apiKey}`;
    try {
      const searchResponse = await axios.get(searchUrl);
      const videoIds = searchResponse.data.items.map((item) => item.id.videoId);
      const videosUrl = `${this.baseUrl}/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${this.apiKey}`;
      const videosResponse = await axios.get(videosUrl);
      const videos = videosResponse.data.items;
      // Separate shorts and longs
      const shorts = [];
      const longs = [];
      for (const video of videos) {
        const duration = this.parseDuration(video.contentDetails.duration);
        if (duration < 60) {
          shorts.push(video);
        } else {
          longs.push(video);
        }
      }
      return { shorts, longs };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch channel videos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    const minutes = match[1] ? parseInt(match[1]) : 0;
    const seconds = match[2] ? parseInt(match[2]) : 0;
    return minutes * 60 + seconds;
  }

  // Calculate engagement rate
  async calculateEngagementRate(channelId: string) {
    const { shorts, longs } = await this.getChannelVideos(channelId);
    const allVideos = [...shorts, ...longs];

    let totalLikes = 0;
    let totalComments = 0;
    let totalViews = 0;

    for (const video of allVideos) {
      totalLikes += parseInt(video.statistics.likeCount || '0');
      totalComments += parseInt(video.statistics.commentCount || '0');
      totalViews += parseInt(video.statistics.viewCount || '0');
    }

    const engagementRate = ((totalLikes + totalComments) / totalViews) * 100;
    return { engagementRate, totalViews, totalLikes, totalComments };
  }
}
