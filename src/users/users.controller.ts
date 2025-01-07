import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { CreateIdentityDetailDto } from './dto/identity/create-identity-detail.dto';
import { UpdateIdentityDetailDto } from './dto/identity/update-identity-detail.dto';
import { CreateIdentityLocationDto } from './dto/location/create-identity-location.dto';
import { UpdateRegistrationsDto } from './dto/registrations/update-registration.dto';
import { IdentityLocation } from './entity/location.entity';
import { IdentityDetail } from './entity/identity-detail.entity';
import { Registration } from './entity/registration.entity';
import { Gallery } from './entity/gallery.entity';
import { S3Service } from '../utils/s3.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../common/common-dto';
import { BlockRegisterDto } from './dto/registrations/block-register.dto';
import { UpdateRegistrationProfileDto } from './dto/registrations/update-registration-profile.dto';
import { VerifyUsernameDto } from './dto/registrations/verify-username.dto';
import { UpdateDealTypeDto } from './dto/identity/update-deal-type.dto';
import { UpdateBrandModeDto } from './dto/identity/update-brand-mode.dto';
import { UpdateBrandOwnershipDto } from './dto/identity/update-brand-ownership';
import { UpdateRegistrationCoverImageDto } from './dto/registrations/update-registration-cover-image.dto';
import { UpdateIdentityProfileDto } from './dto/identity/update-identity-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateIdentityCoverImageDto } from './dto/identity/update-identity-cover-image.dto';
import { NearbyBrandAndInfluencerDto } from './dto/location/nearby-influencer.dto';
import { CreateBrandGalleryDto } from './dto/gallery/create-brand-gallery.dto';
import { CreateUserGalleryDto } from './dto/gallery/create-user-gallery.dto';
import { UpdateGalleryDto } from './dto/gallery/update-gallery.dto';
import { UpdateLocationDto } from './dto/location/update-location.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('registration/verifyUsername')
  @ApiOperation({ summary: 'verify username of user' })
  async verifyUsername(@Body() body: VerifyUsernameDto): Promise<boolean> {
    return this.usersService.verifyUsername(body);
  }

  @Get('presigned-urls')
  @ApiOperation({
    summary:
      'Getting presigned URLs for multiple file uploads to AWS S3 bucket',
  })
  async getPresignedUrls(@Body() body: { fileNames: string[] }) {
    if (!body.fileNames || body.fileNames.length === 0) {
      throw new BadRequestException('File names must be provided');
    }
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const urls = await Promise.all(
      body.fileNames.map((fileName) =>
        this.s3Service.getPreSignedUrl(bucketName, fileName),
      ),
    );
    return { urls };
  }

  // @UseGuards(JwtAuthGuard)
  @Get('registrations')
  @ApiOperation({ summary: 'Fetching registration detail list' })
  findAllRegistration(
    @Query('search') search: string,
  ): Promise<Registration[]> {
    return this.usersService.findAllRegistration(search);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('registration/:id')
  @ApiOperation({ summary: 'Fetching single registration detail' })
  findOneRegistration(@Param('id') id: string): Promise<Registration> {
    return this.usersService.findOneRegistration(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/:id')
  @ApiOperation({ summary: 'Updating registration related detail' })
  updateRegistration(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationsDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistration(id, updateRegistrationDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/status/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateRegistrationStatus(
    @Param('id') id: string,
    @Body() updateRegistrationStatusDto: UpdateStatusDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationStatus(
      id,
      updateRegistrationStatusDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/profile/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateRegistrationProfile(
    @Param('id') id: string,
    @Body() updateRegistrationProfileDto: UpdateRegistrationProfileDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationProfile(
      id,
      updateRegistrationProfileDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/cover/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateUserCoverImage(
    @Param('id') id: string,
    @Body() updateUserCoverImageDto: UpdateRegistrationCoverImageDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationCoverImage(
      id,
      updateUserCoverImageDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'block_user' })
  @Put('block/:id')
  async blockUser(
    @Param('id') id: string,
    @Body() blockRegisterDto: BlockRegisterDto,
  ): Promise<{ message: string }> {
    await this.usersService.blockUser(id, blockRegisterDto);
    return { message: 'User has been blocked successfully' };
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'unblock_user' })
  @Put('unblock/:id')
  async unblockUser(
    @Param('id') id: string,
    @Body() blockRegisterDto: BlockRegisterDto,
  ): Promise<{ message: string }> {
    await this.usersService.unBlockUser(id, blockRegisterDto);
    return { message: 'User has been unblocked successfully' };
  }

  // @UseGuards(JwtAuthGuard)
  @Put('registration/soft/delete/:id')
  @ApiOperation({ summary: 'Soft Deleting registration' })
  async softDeleteRegistration(@Param('id') id: string): Promise<boolean> {
    return this.usersService.softDeleteRegistration(id);
  }

  // Start Identity-details controller =========================================================================================

  // @UseGuards(JwtAuthGuard)
  @Post('identity-detail')
  @ApiOperation({ summary: 'Creating identity details' })
  async createIdentityDetail(
    @Body() createIdentityDetailDto: CreateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    return this.usersService.createIdentityDetail(createIdentityDetailDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('change-threshold')
  // @ApiOperation({ summary: 'Changing threshold' })
  // async ChangeThreshold(
  //   @Body('threshold') threshold: number
  // ): Promise<any> {
  //   if (typeof threshold !== 'number' || threshold < 0) {
  //     return { message: 'Invalid threshold value. Must be a non-negative number.' };
  //   }
  //   this.usersService.ChangeThreshold(threshold);
  //   return { message: 'Threshold updated successfully.' };
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get('get-threshold')
  // @ApiOperation({ summary: 'Get Threshold' })
  // async GetThreshold(): Promise<any> {
  //   return this.usersService.GetThreshold();
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('identity-detail/list')
  @ApiOperation({ summary: 'Fetching list of brand/identity' })
  async findAllIdentity(): Promise<IdentityDetail[]> {
    return this.usersService.findAllIdentity();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('identity-detail/:id')
  @ApiOperation({ summary: 'Fetching single identity/brand with id' })
  async findOne(@Param('id') id: string): Promise<IdentityDetail> {
    return this.usersService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity-detail/:id')
  @ApiOperation({ summary: 'Updating identity related information' })
  async updateIdentityDetail(
    @Param('id') id: string,
    @Body() updateIdentityDetailDto: UpdateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityDetail(id, updateIdentityDetailDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/deal/type/:id')
  @ApiOperation({ summary: 'Updating deal type' })
  async updateDealType(
    @Param('id') id: string,
    @Body() updateDealTypeDto: UpdateDealTypeDto,
  ): Promise<boolean> {
    return this.usersService.updateDealType(id, updateDealTypeDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/brand/mode/:id')
  @ApiOperation({ summary: 'Updating deal type' })
  async updateBrandMode(
    @Param('id') id: string,
    @Body() updateDealTypeDto: UpdateBrandModeDto,
  ): Promise<boolean> {
    return this.usersService.updateBrandMode(id, updateDealTypeDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('brand/ownership/transfer')
  @ApiOperation({ summary: 'Ownership of brand transferred to other user' })
  async transferOwnership(
    @Body('newOwnerDetails') newOwnerDetails: UpdateBrandOwnershipDto,
  ): Promise<string> {
    return await this.usersService.transferBrandOwnership(newOwnerDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Get('brand/list/')
  @ApiOperation({
    summary: 'Fetching all identity detail for particular registration',
  })
  async particularUserBrands(@Req() req): Promise<IdentityDetail[]> {
    return this.usersService.particularUserBrands(req.user.registration_id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity/profile/:id')
  @ApiOperation({ summary: 'profile image Updating identity' })
  async updateIdentityProfileImage(
    @Param('id') id: string,
    @Body() updateIdentityProfileDto: UpdateIdentityProfileDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityProfileImage(
      id,
      updateIdentityProfileDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity/cover/:id')
  @ApiOperation({ summary: ' Cover image Updating identity' })
  async updateIdentityCoverImage(
    @Param('id') id: string,
    @Body() updateUserCoverImageDto: UpdateIdentityCoverImageDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityCoverImage(
      id,
      updateUserCoverImageDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity/status/:id')
  @ApiOperation({ summary: 'Status Updating identity details' })
  async updateIdentityDetailStatus(
    @Param('id') id: string,
    @Body() updateIdentityDetailsStatusDto: UpdateStatusDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityDetailStatus(
      id,
      updateIdentityDetailsStatusDto,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Put('identity/soft/delete/:id')
  @ApiOperation({ summary: 'Soft Deleting identity detail' })
  async softDeleteIdentityDetail(@Param('id') id: string): Promise<boolean> {
    return this.usersService.softDeleteIdentityDetail(id);
  }

  // Start Identity-location controller =============================================================================

  // @UseGuards(JwtAuthGuard)
  @Post('location/create')
  @ApiOperation({ summary: 'Creating identity location' })
  async createLocation(
    @Body() createIdentityLocationDto: CreateIdentityLocationDto,
  ): Promise<IdentityLocation | IdentityLocation[]> {
    return this.usersService.createLocation(createIdentityLocationDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('location/list')
  @ApiOperation({ summary: 'Fetching all identity location' })
  async findAllIdentityLocation(): Promise<IdentityLocation[]> {
    return this.usersService.findAllIdentityLocation();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('location/:id')
  @ApiOperation({ summary: 'Fetching identity location by id' })
  async findOneIdentityLocation(
    @Param('id') id: string,
  ): Promise<IdentityLocation> {
    return this.usersService.findOneIdentityLocation(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('nearby-influencer')
  @ApiOperation({ summary: 'Fetching all nearby influencer' })
  async findAllNearbyInfluencer(
    @Body() body: NearbyBrandAndInfluencerDto,
  ): Promise<IdentityLocation[]> {
    return this.usersService.findAllNearbyInfluencer(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('nearby-brand')
  @ApiOperation({ summary: 'Fetching all Nearby brand details' })
  async findAllNearbyBrandDetail(
    @Body() body: NearbyBrandAndInfluencerDto,
  ): Promise<IdentityDetail[]> {
    return this.usersService.findAllNearbyBrandDetail(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('location/update/:id')
  @ApiOperation({ summary: 'Updating identity location' })
  async updateLocation(
    @Param('id') id: string,
    @Body() body: UpdateLocationDto,
  ): Promise<IdentityLocation> {
    return this.usersService.updateLocation(id, body);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('location/delete/:id')
  @ApiOperation({ summary: 'Delete identity location info' })
  async removeIdentityLocation(@Param('id') id: string): Promise<void> {
    return this.usersService.removeIdentityLocation(id);
  }

  // gallery logic =============================================================

  // @UseGuards(JwtAuthGuard)
  @Post('create/brand/gallery')
  @ApiOperation({ summary: 'Creating brand gallery' })
  async createBrandGallery(
    @Body() body: CreateBrandGalleryDto,
  ): Promise<Gallery> {
    return this.usersService.createBrandGallery(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create/user/gallery')
  @ApiOperation({ summary: 'Creating brand gallery' })
  async createUserGallery(
    @Body() body: CreateUserGalleryDto,
  ): Promise<Gallery> {
    return this.usersService.createUserGallery(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('gallery/list')
  @ApiOperation({ summary: 'Get gallery list' })
  async findAllGallery(): Promise<Gallery[]> {
    return this.usersService.findAllGallery();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('gallery/:id')
  @ApiOperation({ summary: 'Get single gallery' })
  async findOneGallery(@Param('id') id: string): Promise<Gallery> {
    return this.usersService.findOneGallery(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('addGalleryImage')
  @ApiOperation({ summary: 'Update ' })
  async addGalleryImage(@Body() body: UpdateGalleryDto): Promise<Gallery> {
    return this.usersService.addGalleryImage(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('removeGalleryImage')
  @ApiOperation({ summary: 'Update ' })
  async removeGalleryImage(@Body() body: UpdateGalleryDto): Promise<Gallery> {
    return this.usersService.removeGalleryImage(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('gallery/remove/:id')
  @ApiOperation({ summary: 'Delete cover photo table from db' })
  async removeGallery(@Param('id') id: string): Promise<void> {
    return this.usersService.removeGallery(id);
  }
}
