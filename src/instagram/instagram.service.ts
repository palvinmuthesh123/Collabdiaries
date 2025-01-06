import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstagramToken } from './entities/instagram.entity';
import { GenerateTokenDto } from './dto/generate-token.dto';

@Injectable()
export class InstagramService {
  private readonly appSecret = '9dff9316a885278aaacf9f7efc1bafe1';
  constructor(
    @InjectRepository(InstagramToken)
    private readonly instagramTokenRepository: Repository<InstagramToken>,
  ) {}

  async getInstagramLongLivedToken(inputData: GenerateTokenDto) {
    const { accessToken } = inputData;
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;
    const userInfoUrl = `https://graph.instagram.com/me?fields=id&access_token=${accessToken}`;
    const userInfoResponse = await axios.get(userInfoUrl);
    const response = await axios.get(url);
    if (!response && !userInfoResponse)
      throw new BadRequestException(
        'refresh token and user info is not get, problem in url',
      );
    const longLivedToken = response.data.access_token;
    const expiresIn = response.data.expires_in;
    const expirationTime = new Date();
    const userId = userInfoResponse.data.id;
    expirationTime.setSeconds(expirationTime.getSeconds() + expiresIn);
    await this.saveToken(expirationTime, longLivedToken, userId);
    return {
      userId,
    };
  }

  // Fetch User Data (User and Media)
  async getUserData(userId: string): Promise<any> {
    const instagramUserDetails = await this.instagramTokenRepository.findOne({
      where: { userId },
    });
    if (!instagramUserDetails)
      throw new NotFoundException('this user not exist firstly login');
    const accessToken = instagramUserDetails.accessToken;
    const userUrl = `https://graph.instagram.com/me?fields=id,username,name,account_type,followers_count,follows_count,media_count&access_token=${accessToken}`;
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`;
    try {
      const [userResponse, mediaResponse] = await Promise.all([
        axios.get(userUrl),
        axios.get(mediaUrl),
      ]);
      return {
        user: userResponse.data,
        posts: mediaResponse.data.data.map((post) => ({
          id: post.id,
          mediaType: post.media_type,
          mediaUrl: post.media_url,
          permalink: post.permalink,
          timestamp: post.timestamp,
          likeCount: post.like_count,
          commentCount: post.comments_count,
        })),
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user data or posts',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Refresh Long-Lived Token
  async refreshAccessToken(longLivedToken: string) {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedToken}`;
    try {
      const response = await axios.get(url);
      const refreshedToken = response.data.access_token;
      const expiresIn = response.data.expires_in;
      const expirationTime = new Date();
      expirationTime.setSeconds(expirationTime.getSeconds() + expiresIn);
      return {
        refreshedToken,
        expirationTime,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to refresh access token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async saveToken(
    expirationTime: Date,
    accessToken: string,
    userId: string,
  ): Promise<InstagramToken> {
    let existingToken = await this.instagramTokenRepository.findOne({
      where: { userId },
    });
    if (existingToken) {
      existingToken.accessToken = accessToken;
      existingToken.expirationTime = expirationTime;
      return await this.instagramTokenRepository.save(existingToken);
    } else {
      const newToken = this.instagramTokenRepository.create({
        userId,
        accessToken,
        expirationTime,
      });
      return await this.instagramTokenRepository.save(newToken);
    }
  }
}
