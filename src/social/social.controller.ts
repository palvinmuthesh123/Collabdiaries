import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { SocialService } from './social.service';

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

import { CollabFollowingDetail } from './entity/collab-following-detail.entity';
import { CollabIdentityCount } from './entity/collab-identity-count.entity';
import { SocialComment } from './entity/social-comment.entity';
import { Promotion } from './entity/promotion.entity';
import { SocialIdentityCount } from './entity/social-identity-count.entity';
import { SocialLike } from './entity/social-like.entity';
import { SocialPost } from './entity/social-post.entity';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  //Collab Following Detail
  @Post('collab-following-detail')
  async createCollabFollowing(
    @Body() createDto: CreateCollabFollowingDetailDto,
  ): Promise<CollabFollowingDetail> {
    return this.socialService.createCollabFollowing(createDto);
  }

  @Post('save-social-details')
  async saveSocialDetails(
    @Body() content: { type: 'youtube' | 'instagram' ; channelId: string; username: string; identityId: string }
  ) {
    return this.socialService.saveSocialDetails(content);
  }

  @Put('collab-following-detail/:id')
  async updateCollabFollowing(
    @Param('id') id: string,
    @Body() updateDto: UpdateCollabFollowingDetailDto,
  ): Promise<CollabFollowingDetail> {
    return this.socialService.updateCollabFollowing(id, updateDto);
  }

  @Get('collab-following-detail')
  async findAll(): Promise<CollabFollowingDetail[]> {
    return this.socialService.findAllCollabFollowing();
  }

  @Get('collab-following-detail/:id')
  async findOneCollabFollowing(
    @Param('id') id: string,
  ): Promise<CollabFollowingDetail> {
    return this.socialService.findOneCollabFollowing(id);
  }

  @Delete('collab-following-detail/:id')
  async removeCollabFollowing(@Param('id') id: string): Promise<void> {
    return this.socialService.removeCollabFollowing(id);
  }

  //Collab Identity Count
  @Post('collab-identity-count')
  async createCollabIdentityCount(
    @Body() createDto: CreateCollabIdentityCountDto,
  ): Promise<CollabIdentityCount> {
    return this.socialService.createCollabIdentityCount(createDto);
  }

  @Put('collab-identity-count/:id')
  async updateCollabIdentityCount(
    @Param('id') id: string,
    @Body() updateDto: UpdateCollabIdentityCountDto,
  ): Promise<CollabIdentityCount> {
    return this.socialService.updateCollabIdentityCount(id, updateDto);
  }

  @Get('collab-identity-count')
  async findAllCollabIdentityCount(): Promise<CollabIdentityCount[]> {
    return this.socialService.findAllCollabIdentityCount();
  }

  @Get('collab-identity-count/:id')
  async findOneCollabIdentityCount(
    @Param('id') id: string,
  ): Promise<CollabIdentityCount> {
    return this.socialService.findOneCollabIdentityCount(id);
  }

  @Delete('collab-identity-count/:id')
  async removeCollabIdentityCount(@Param('id') id: string): Promise<void> {
    return this.socialService.removeCollabIdentityCount(id);
  }

  //Promotion
  @Post('promotion')
  async createPromotion(
    @Body() createDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.socialService.createPromotion(createDto);
  }

  @Put('promotion/:id')
  async updatePromotion(
    @Param('id') id: string,
    @Body() updateDto: UpdatePromotionDto,
  ): Promise<Promotion> {
    return this.socialService.updatePromotion(id, updateDto);
  }

  @Get('promotion')
  async findAllPromotion(): Promise<Promotion[]> {
    return this.socialService.findAllPromotion();
  }

  @Get('promotion/:id')
  async findOnePromotion(@Param('id') id: string): Promise<Promotion> {
    return this.socialService.findOnePromotion(id);
  }

  @Delete('promotion/:id')
  async removePromotion(@Param('id') id: string): Promise<void> {
    return this.socialService.removePromotion(id);
  }

  //Social comment
  @Post('social-comment')
  async createSocialComment(
    @Body() createDto: CreateSocialCommentDto,
  ): Promise<SocialComment> {
    return this.socialService.createSocialComment(createDto);
  }

  @Put('social-comment/:id')
  async updateSocialComment(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialCommentDto,
  ): Promise<SocialComment> {
    return this.socialService.updateSocialComment(id, updateDto);
  }

  @Get('social-comment')
  async findAllSocialComment(): Promise<SocialComment[]> {
    return this.socialService.findAllSocialComment();
  }

  @Get('social-comment/:id')
  async findOneSocialComment(@Param('id') id: string): Promise<SocialComment> {
    return this.socialService.findOneSocialComment(id);
  }

  @Delete('social-comment/:id')
  async removeSocialComment(@Param('id') id: string): Promise<void> {
    return this.socialService.removeSocialComment(id);
  }

  //Social identity count
  @Post('social-identity-count')
  async createSocialIdentityCount(
    @Body() createDto: CreateSocialIdentityCountDto,
  ): Promise<SocialIdentityCount> {
    return this.socialService.createSocialIdentityCount(createDto);
  }

  @Put('social-identity-count/:id')
  async updateSocialIdentityCount(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialIdentityCountDto,
  ): Promise<SocialIdentityCount> {
    return this.socialService.updateSocialIdentityCount(id, updateDto);
  }

  @Get('social-identity-count')
  async findAllSocialIdentityCount(): Promise<SocialIdentityCount[]> {
    return this.socialService.findAllSocialIdentityCount();
  }

  @Get('social-identity-count/:id')
  async findOneSocialIdentityCount(
    @Param('id') id: string,
  ): Promise<SocialIdentityCount> {
    return this.socialService.findOneSocialIdentityCount(id);
  }

  @Get('is-influencer/:id')
  async findSocialByIdentityId(
    @Param('id') id: string,
  ): Promise<any> {
    return this.socialService.findSocialByIdentityId(id);
  }

  @Delete('social-identity-count/:id')
  async removeSocialIdentityCount(@Param('id') id: string): Promise<void> {
    return this.socialService.removeSocialIdentityCount(id);
  }

  //Social Like
  @Post('social-like')
  async createSocialLike(
    @Body() createDto: CreateSocialLikeDto,
  ): Promise<SocialLike> {
    return this.socialService.createSocialLike(createDto);
  }

  @Put('social-like/:id')
  async updateSocialLike(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialLikeDto,
  ): Promise<SocialLike> {
    return this.socialService.updateSocialLike(id, updateDto);
  }

  @Get('social-like')
  async findAllSocialLike(): Promise<SocialLike[]> {
    return this.socialService.findAllSocialLike();
  }

  @Get('social-like/:id')
  async findOneSocialLike(@Param('id') id: string): Promise<SocialLike> {
    return this.socialService.findOneSocialLike(id);
  }

  @Delete('social-like/:id')
  async removeSocialLike(@Param('id') id: string): Promise<void> {
    return this.socialService.removeSocialLike(id);
  }

  //Social Post
  @Post('social-post')
  async createSocialPost(
    @Body() createDto: CreateSocialPostDto,
  ): Promise<SocialPost> {
    return this.socialService.createSocialPost(createDto);
  }

  @Put('social-post/:id')
  async updateSocialPost(
    @Param('id') id: string,
    @Body() updateDto: UpdateSocialPostDto,
  ): Promise<SocialPost> {
    return this.socialService.updateSocialPost(id, updateDto);
  }

  @Get('social-post')
  async findAllSocialPost(): Promise<SocialPost[]> {
    return this.socialService.findAllSocialPost();
  }

  @Get('social-post/:id')
  async findOneSocialPost(@Param('id') id: string): Promise<SocialPost> {
    return this.socialService.findOneSocialPost(id);
  }

  @Delete('social-post/:id')
  async removeSocialPost(@Param('id') id: string): Promise<void> {
    return this.socialService.removeSocialPost(id);
  }
}
