import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YouTubeService {
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly apiKey = 'AIzaSyBDBnmdYW4RoSmH1QBAlZUT9L6rdbKXmH0'; // Replace with your API key

  // Fetch channel data
  async getChannelData(channelId: string) {
    const url = `${this.baseUrl}/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`;
    try {
      const response = await axios.get(url);
      const channel = response.data.items[0];
      const { title, description } = channel.snippet;
      const { viewCount, subscriberCount, videoCount } = channel.statistics;

      return { title, description, viewCount, subscriberCount, videoCount };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch channel data',
        HttpStatus.BAD_REQUEST,
      );
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

  // Parse ISO 8601 duration (PT#M#S) to seconds
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
