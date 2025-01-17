import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CollabFollowingDetail } from './entity/collab-following-detail.entity';
import { CollabIdentityCount } from './entity/collab-identity-count.entity';
import { Promotion } from './entity/promotion.entity';
import { SocialComment } from './entity/social-comment.entity';
import { SocialIdentityCount } from './entity/social-identity-count.entity';
import { SocialLike } from './entity/social-like.entity';
import { SocialPost } from './entity/social-post.entity';

import { CreateCollabFollowingDetailDto } from './dto/create-collab-following.dto';
import { UpdateCollabFollowingDetailDto } from './dto/update-collab-following.dto';
import { CreateCollabIdentityCountDto } from './dto/create-collab-identitycount.dto';
import { UpdateCollabIdentityCountDto } from './dto/update-collab-identitycount.dto';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { CreateSocialCommentDto } from './dto/create-social-comment.dto';
import { UpdateSocialCommentDto } from './dto/update-social-comment.dto';
import { CreateSocialIdentityCountDto } from './dto/create-social-identity-count.dto';
import { UpdateSocialIdentityCountDto } from './dto/update-social-identity-count.dto';
import { CreateSocialLikeDto } from './dto/create-social-like.dto';
import { UpdateSocialLikeDto } from './dto/update-social-like.dto';
import { CreateSocialPostDto } from './dto/create-social-post.dto';
import { UpdateSocialPostDto } from './dto/update-social-post.dto';
import * as https from 'https';
import { OAuth2Client } from 'google-auth-library';
import { LinkType } from '../common/enum';
import { FindAllPromotionDto } from './dto/findAllPromotion.dto';

@Injectable()
export class SocialService {
  private readonly API_URL = process.env.YOUTUBE_API_URL;
  private readonly CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
  private readonly REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI;
  private oauth2Client: OAuth2Client;

  constructor(
    @InjectRepository(CollabFollowingDetail)
    private readonly collabFollowingDetailRepository: Repository<CollabFollowingDetail>,
    @InjectRepository(CollabIdentityCount)
    private readonly collabIdentityCountRepository: Repository<CollabIdentityCount>,
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(SocialComment)
    private readonly socialCommentRepository: Repository<SocialComment>,
    @InjectRepository(SocialIdentityCount)
    private readonly socialIdentityCountRepository: Repository<SocialIdentityCount>,
    @InjectRepository(SocialLike)
    private readonly socialLikeRepository: Repository<SocialLike>,
    @InjectRepository(SocialPost)
    private readonly socialPostRepository: Repository<SocialPost>,
  ) {
    this.oauth2Client = new OAuth2Client(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI,
    );
  }

  //Collab Following Count
  async createCollabFollowing(
    createDto: CreateCollabFollowingDetailDto,
  ): Promise<CollabFollowingDetail> {
    const collabFollowingDetail =
      this.collabFollowingDetailRepository.create(createDto);
    return await this.collabFollowingDetailRepository.save(
      collabFollowingDetail,
    );
  }

  async updateCollabFollowing(
    id: string,
    updateDto: UpdateCollabFollowingDetailDto,
  ): Promise<CollabFollowingDetail> {
    const collabFollowingDetail =
      await this.collabFollowingDetailRepository.findOne({
        where: { collab_following_detail_id: id },
      });

    if (!collabFollowingDetail) {
      throw new NotFoundException(
        `CollabFollowingDetail with ID ${id} not found`,
      );
    }

    Object.assign(collabFollowingDetail, updateDto);
    return await this.collabFollowingDetailRepository.save(
      collabFollowingDetail,
    );
  }

  async findAllCollabFollowing(): Promise<CollabFollowingDetail[]> {
    return await this.collabFollowingDetailRepository.find();
  }

  async findOneCollabFollowing(id: string): Promise<CollabFollowingDetail> {
    const collabFollowingDetail =
      await this.collabFollowingDetailRepository.findOne({
        where: { collab_following_detail_id: id },
      });
    if (!collabFollowingDetail) {
      throw new NotFoundException(
        `CollabFollowingDetail with ID ${id} not found`,
      );
    }
    return collabFollowingDetail;
  }

  async removeCollabFollowing(id: string): Promise<void> {
    const result = await this.collabFollowingDetailRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `CollabFollowingDetail with ID ${id} not found`,
      );
    }
  }

  //Collab Identity Count
  async createCollabIdentityCount(
    createDto: CreateCollabIdentityCountDto,
  ): Promise<CollabIdentityCount> {
    const collabIdentityCount =
      this.collabIdentityCountRepository.create(createDto);
    return await this.collabIdentityCountRepository.save(collabIdentityCount);
  }

  async updateCollabIdentityCount(
    id: string,
    updateDto: UpdateCollabIdentityCountDto,
  ): Promise<CollabIdentityCount> {
    const collabIdentityCount =
      await this.collabIdentityCountRepository.findOne({
        where: { collab_identity_count_id: id },
      });

    if (!collabIdentityCount) {
      throw new NotFoundException(
        `CollabIdentityCount with ID ${id} not found`,
      );
    }

    Object.assign(collabIdentityCount, updateDto);
    return await this.collabIdentityCountRepository.save(collabIdentityCount);
  }

  async findAllCollabIdentityCount(): Promise<CollabIdentityCount[]> {
    return await this.collabIdentityCountRepository.find();
  }

  async fetchData(
    endpoint: string,
    type: 'youtube' | 'instagram',
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname:
          type === 'youtube'
            ? process.env.YOUTUBE_API_HOST
            : process.env.INSTAGRAM_API_HOST,
        path: endpoint,
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            type === 'youtube'
              ? process.env.YOUTUBE_API_HOST
              : process.env.INSTAGRAM_API_HOST,
          'x-rapidapi-key': process.env.YOUTUBE_API_KEY,
        },
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error('Error parsing JSON response'));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Error making API request: ${error.message}`));
      });

      req.end();
    });
  }

  async saveSocialDetails(content: {
    type: 'youtube' | 'instagram';
    channelId: string;
    username: string;
    identityId: string;
  }): Promise<any> {
    try {
      const endpoint =
        content.type === 'youtube'
          ? `/channels?id=${content.channelId}&part=snippet%2CcontentDetails%2Cstatistics`
          : `/api/instagram/users/info/${content.username}/username`;

      const response =
        content.type === 'youtube'
          ? await this.fetchData(endpoint, 'youtube')
          : await this.fetchData(endpoint, 'instagram');

      if (!response || (content.type === 'youtube' && !response.items)) {
        throw new NotFoundException(
          `${content.type === 'youtube' ? 'Channel' : 'Account'} not found`,
        );
      }

      const newFollowerCount =
        content.type === 'youtube'
          ? Number(response.items.statistics.subscriberCount || 0)
          : Number(response.user.follower_count || 0);

      const newFollowingCount =
        content.type === 'instagram'
          ? Number(response.user.following_count || 0)
          : 0;

      const existingRecord = await this.socialIdentityCountRepository.findOne({
        where: { identity_id: content.identityId },
      });

      if (existingRecord) {
        existingRecord.follower_count =
          Number(existingRecord.follower_count || 0) + newFollowerCount;
        existingRecord.following_count =
          Number(existingRecord.following_count || 0) + newFollowingCount;
        return await this.socialIdentityCountRepository.save(existingRecord);
      } else {
        const params = {
          identity_id: content.identityId,
          follower_count: newFollowerCount,
          following_count: newFollowingCount,
          engagement_rate: 0,
        };
        const socialIdentityCount =
          this.socialIdentityCountRepository.create(params);
        return await this.socialIdentityCountRepository.save(
          socialIdentityCount,
        );
      }
    } catch (error) {
      throw new NotFoundException(
        `Error fetching ${content.type === 'youtube' ? 'channel' : 'Instagram'} details`,
      );
    }
  }

  async findOneCollabIdentityCount(id: string): Promise<CollabIdentityCount> {
    const collabIdentityCount =
      await this.collabIdentityCountRepository.findOne({
        where: { collab_identity_count_id: id },
      });
    if (!collabIdentityCount) {
      throw new NotFoundException(
        `CollabIdentityCount with ID ${id} not found`,
      );
    }
    return collabIdentityCount;
  }

  async removeCollabIdentityCount(id: string): Promise<void> {
    const result = await this.collabIdentityCountRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `CollabIdentityCount with ID ${id} not found`,
      );
    }
  }

  //Promotion ==========================================================================================

  async createPromotion(createDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createDto);
    return await this.promotionRepository.save(promotion);
  }

  async findAllPromotion(input: FindAllPromotionDto): Promise<Promotion[]> {
    const { isHide, identity_id } = input;
    const whereConditions: any = {};
    if (isHide) whereConditions.isHide = isHide;
    if (identity_id) whereConditions.identity_id = identity_id;
    return await this.promotionRepository.find({
      where: whereConditions,
    });
  }

  async findOnePromotion(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { promotion_id: id },
    });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return promotion;
  }

  async promotionsWithIdentityId(
    identity_id: string,
    link_type: LinkType,
  ): Promise<Promotion[]> {
    if (!identity_id) throw new NotFoundException('identity_id is required');
    const promotions = await this.promotionRepository.find({
      where: { identity_id: identity_id },
    });
    if (link_type === LinkType.hyperlink) {
      return promotions.filter(
        (promo) => promo.link_type === LinkType.hyperlink,
      );
    }
    if (link_type === LinkType.linktree) {
      return promotions.filter(
        (promo) => promo.link_type === LinkType.linktree,
      );
    }
    return promotions;
  }

  async updatePromotion(
    id: string,
    updateDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { promotion_id: id },
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    Object.assign(promotion, updateDto);
    return await this.promotionRepository.save(promotion);
  }

  async removePromotion(id: string): Promise<void> {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
  }

  //Social comment ==========================================================================
  async createSocialComment(
    createDto: CreateSocialCommentDto,
  ): Promise<SocialComment> {
    const socialComment = this.socialCommentRepository.create(createDto);
    return await this.socialCommentRepository.save(socialComment);
  }

  async updateSocialComment(
    id: string,
    updateDto: UpdateSocialCommentDto,
  ): Promise<SocialComment> {
    const socialComment = await this.socialCommentRepository.findOne({
      where: { comment_id: id },
    });

    if (!socialComment) {
      throw new NotFoundException(`SocialComment with ID ${id} not found`);
    }

    Object.assign(socialComment, updateDto);
    return await this.socialCommentRepository.save(socialComment);
  }

  async findAllSocialComment(): Promise<SocialComment[]> {
    return await this.socialCommentRepository.find();
  }

  async findOneSocialComment(id: string): Promise<SocialComment> {
    const socialComment = await this.socialCommentRepository.findOne({
      where: { comment_id: id },
    });
    if (!socialComment) {
      throw new NotFoundException(`SocialComment with ID ${id} not found`);
    }
    return socialComment;
  }

  async removeSocialComment(id: string): Promise<void> {
    const result = await this.socialCommentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SocialComment with ID ${id} not found`);
    }
  }

  //Social identity count
  async createSocialIdentityCount(
    createDto: CreateSocialIdentityCountDto,
  ): Promise<SocialIdentityCount> {
    const socialIdentityCount =
      this.socialIdentityCountRepository.create(createDto);
    return await this.socialIdentityCountRepository.save(socialIdentityCount);
  }

  async updateSocialIdentityCount(
    id: string,
    updateDto: UpdateSocialIdentityCountDto,
  ): Promise<SocialIdentityCount> {
    const socialIdentityCount =
      await this.socialIdentityCountRepository.findOne({
        where: { social_identity_count_id: id },
      });

    if (!socialIdentityCount) {
      throw new NotFoundException(
        `SocialIdentityCount with ID ${id} not found`,
      );
    }

    Object.assign(socialIdentityCount, updateDto);
    return await this.socialIdentityCountRepository.save(socialIdentityCount);
  }

  async findAllSocialIdentityCount(): Promise<SocialIdentityCount[]> {
    return await this.socialIdentityCountRepository.find();
  }

  async findOneSocialIdentityCount(id: string): Promise<SocialIdentityCount> {
    const socialIdentityCount =
      await this.socialIdentityCountRepository.findOne({
        where: { social_identity_count_id: id },
      });
    if (!socialIdentityCount) {
      throw new NotFoundException(
        `SocialIdentityCount with ID ${id} not found`,
      );
    }
    return socialIdentityCount;
  }

  async findSocialByIdentityId(id: string): Promise<any> {
    const socialIdentityCount =
      await this.socialIdentityCountRepository.findOne({
        where: { identity_id: id },
      });
    if (!socialIdentityCount) {
      return {
        influencer: false,
      };
    }
    if (socialIdentityCount.follower_count > 1000) {
      Object.assign(socialIdentityCount, { influencer: true });
    } else {
      Object.assign(socialIdentityCount, { influencer: false });
    }
    return socialIdentityCount;
  }

  async removeSocialIdentityCount(id: string): Promise<void> {
    const result = await this.socialIdentityCountRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `SocialIdentityCount with ID ${id} not found`,
      );
    }
  }

  //Social Like
  async createSocialLike(createDto: CreateSocialLikeDto): Promise<SocialLike> {
    const socialLike = this.socialLikeRepository.create(createDto);
    return await this.socialLikeRepository.save(socialLike);
  }

  async updateSocialLike(
    id: string,
    updateDto: UpdateSocialLikeDto,
  ): Promise<SocialLike> {
    const socialLike = await this.socialLikeRepository.findOne({
      where: { like_id: id },
    });

    if (!socialLike) {
      throw new NotFoundException(`SocialLike with ID ${id} not found`);
    }

    Object.assign(socialLike, updateDto);
    return await this.socialLikeRepository.save(socialLike);
  }

  async findAllSocialLike(): Promise<SocialLike[]> {
    return await this.socialLikeRepository.find();
  }

  async findOneSocialLike(id: string): Promise<SocialLike> {
    const socialLike = await this.socialLikeRepository.findOne({
      where: { like_id: id },
    });
    if (!socialLike) {
      throw new NotFoundException(`SocialLike with ID ${id} not found`);
    }
    return socialLike;
  }

  async removeSocialLike(id: string): Promise<void> {
    const result = await this.socialLikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SocialLike with ID ${id} not found`);
    }
  }

  //Social Post
  async createSocialPost(createDto: CreateSocialPostDto): Promise<SocialPost> {
    const socialPost = this.socialPostRepository.create(createDto);
    return await this.socialPostRepository.save(socialPost);
  }

  async updateSocialPost(
    id: string,
    updateDto: UpdateSocialPostDto,
  ): Promise<SocialPost> {
    const socialPost = await this.socialPostRepository.findOne({
      where: { post_id: id },
    });

    if (!socialPost) {
      throw new NotFoundException(`SocialPost with ID ${id} not found`);
    }

    Object.assign(socialPost, updateDto);
    return await this.socialPostRepository.save(socialPost);
  }

  async findAllSocialPost(): Promise<SocialPost[]> {
    return await this.socialPostRepository.find();
  }

  async findOneSocialPost(id: string): Promise<SocialPost> {
    const socialPost = await this.socialPostRepository.findOne({
      where: { post_id: id },
    });
    if (!socialPost) {
      throw new NotFoundException(`SocialPost with ID ${id} not found`);
    }
    return socialPost;
  }

  async removeSocialPost(id: string): Promise<void> {
    const result = await this.socialPostRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SocialPost with ID ${id} not found`);
    }
  }

  // .........................................................................

  async getAuthUrl(): Promise<string> {
    const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getAccessToken(code: string): Promise<string> {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens.access_token;
  }

  private async fetchData1(url: string, accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      https
        .get(url, options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async getAuthenticatedChannelDetails(accessToken: string) {
    const url = `${this.API_URL}/channels?part=snippet,contentDetails,statistics&mine=true`;
    return await this.fetchData1(url, accessToken);
  }

  async getVideos(channelId: string, accessToken: string) {
    const url = `${this.API_URL}/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video`;
    return await this.fetchData1(url, accessToken);
  }
  io;
  async getVideoDetails(videoId: string, accessToken: string) {
    const url = `${this.API_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}`;
    return await this.fetchData1(url, accessToken);
  }
}
