import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {UsersService} from './users.service';
import {CreateIdentityDetailDto} from './dto/identity/create-identity-detail.dto';
import {UpdateIdentityDetailDto} from './dto/identity/update-identity-detail.dto';
import {CreateIdentityLocationDto} from './dto/location/create-identity-location.dto';
import {UpdateRegistrationsDto} from './dto/registrations/update-registration.dto';
import {CreateUserCoverPhotoDto} from './dto/create-user-coverphoto.dto';
import {UpdateUserCoverPhotoDto} from './dto/update-user-coverphoto.dto';
import {IdentityLocation} from './entity/location.entity';
import {IdentityDetail} from './entity/identity-detail.entity';
import {Registration} from './entity/registration.entity';
import {UserCoverPhoto} from './entity/user-coverphoto.entity';
import {S3Service} from '../utils/s3.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {UpdateStatusDto} from "../common/common-dto";
import {BlockRegisterDto} from "./dto/registrations/block-register.dto";
import {UpdateRegistrationProfileDto} from "./dto/registrations/update-registration-profile.dto";
import {VerifyUsernameDto} from "./dto/registrations/verify-username.dto";
import {UpdateDealTypeDto} from "./dto/identity/update-deal-type.dto";
import {UpdateBrandModeDto} from "./dto/identity/update-brand-mode.dto";
import {UpdateBrandOwnershipDto} from "./dto/identity/update-brand-ownership";
import {UpdateBrandLocationDto} from "./dto/location/update-brand-location.dto";
import {UpdateUserLocationDto} from "./dto/location/update-user-location.dto";
import {UpdateRegistrationCoverImageDto} from "./dto/registrations/update-registration-cover-image.dto";
import {UpdateIdentityProfileDto} from "./dto/identity/update-identity-profile.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateIdentityCoverImageDto} from "./dto/identity/update-identity-cover-image.dto";
import {NearbyBrandAndInfluencerDto} from "./dto/location/nearby-influencer.dto";

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
  async verifyUsername(@Body() body:VerifyUsernameDto):Promise<{msg:string}> {
   return  this.usersService.verifyUsername(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('presigned-url')
  @ApiOperation({ summary: 'Getting presigned url for file upload to Aws s3' })
  async getPresignedUrl(@Query('fileName') fileName: string) {
    if (!fileName) {
      throw new BadRequestException('File name must be provided');
    }
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const url = await this.s3Service.getPreSignedUrl(bucketName, fileName);
    return { url };
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
    return this.usersService.updateRegistrationStatus(id, updateRegistrationStatusDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/profile/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateRegistrationProfile(
      @Param('id') id: string,
      @Body() updateRegistrationProfileDto: UpdateRegistrationProfileDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationProfile(id, updateRegistrationProfileDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/registration/cover/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateUserCoverImage(
      @Param('id') id: string,
      @Body() updateUserCoverImageDto: UpdateRegistrationCoverImageDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationCoverImage(id, updateUserCoverImageDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'block_user' })
  @Put('block/:id')
  async blockUser( @Param('id') id: string,@Body() blockRegisterDto: BlockRegisterDto):Promise<{message:string}> {
    await this.usersService.blockUser(id,blockRegisterDto);
    return { message: 'User has been blocked successfully' };
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'unblock_user' })
  @Put('unblock/:id')
  async unblockUser(@Param('id') id: string,@Body() blockRegisterDto: BlockRegisterDto):Promise<{message:string}>  {
    await this.usersService.unBlockUser(id,blockRegisterDto);
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

  @UseGuards(JwtAuthGuard)
  @Post('change-threshold')
  @ApiOperation({ summary: 'Changind threshold' })
  async ChangeThreshold(
    @Body('threshold') threshold: number
  ): Promise<any> {
    if (typeof threshold !== 'number' || threshold < 0) {
      return { message: 'Invalid threshold value. Must be a non-negative number.' };
    }

    this.usersService.ChangeThreshold(threshold);
    return { message: 'Threshold updated successfully.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-threshold')
  @ApiOperation({ summary: 'Get Threshold' })
  async GetThreshold(): Promise<any> {
    return this.usersService.GetThreshold();
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity-detail/list')
  @ApiOperation({ summary: 'Fetching list of brand/identity' })
  async findAll(): Promise<IdentityDetail[]> {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('identity-detail/:id')
  @ApiOperation({ summary: 'Fetching single identity/brand with id' })
  async findOne(@Param('id') id: string,): Promise<IdentityDetail> {
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
  return await this.usersService.transferBrandOwnership( newOwnerDetails);
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
    return this.usersService.updateIdentityProfileImage(id, updateIdentityProfileDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity/cover/:id')
  @ApiOperation({ summary: ' Cover image Updating identity' })
  async updateIdentityCoverImage(
      @Param('id') id: string,
      @Body() updateUserCoverImageDto: UpdateIdentityCoverImageDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityCoverImage(id, updateUserCoverImageDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/identity/status/:id')
  @ApiOperation({ summary: 'Status Updating identity details' })
  async updateIdentityDetailStatus(
      @Param('id') id: string,
      @Body() updateIdentityDetailsStatusDto: UpdateStatusDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityDetailStatus(id, updateIdentityDetailsStatusDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('identity/soft/delete/:id')
  @ApiOperation({ summary: 'Soft Deleting identity detail' })
  async softDeleteIdentityDetail(@Param('id') id: string): Promise<boolean> {
    return this.usersService.softDeleteIdentityDetail(id);
  }

// Start Identity-location controller =============================================================================

  // @UseGuards(JwtAuthGuard)
  @Post('create/brand/location')
  @ApiOperation({ summary: 'Creating identity location' })
  async createBrandLocation(
    @Body() createIdentityLocationDto: CreateIdentityLocationDto,
  ): Promise<IdentityLocation> {
    return this.usersService.createBrandLocation(createIdentityLocationDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('create/user/location')
  @ApiOperation({ summary: 'Creating identity location' })
  async createUserLocation(@Body() createIdentityLocationDto: CreateIdentityLocationDto,): Promise<IdentityLocation[]> {
    return this.usersService.createUserLocation(createIdentityLocationDto);
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
  async findAllNearbyInfluencer(@Body() body: NearbyBrandAndInfluencerDto): Promise<IdentityLocation[]> {
    return this.usersService.findAllNearbyInfluencer(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('nearby-brand')
  @ApiOperation({ summary: 'Fetching all Nearby brand details' })
  async findAllNearbyBrandDetail(@Body() body:NearbyBrandAndInfluencerDto): Promise<IdentityDetail[]> {
    return this.usersService.findAllNearbyBrandDetail(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/brand/location')
  @ApiOperation({ summary: 'Updating identity location' })
  async updateBrandLocation(
    @Body() updateBrandLocationDto: UpdateBrandLocationDto,
  ): Promise<IdentityLocation> {
    return this.usersService.updateBrandLocation(updateBrandLocationDto,);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/user/location')
  @ApiOperation({ summary: 'Updating identity location' })
  async updateUserLocation(@Body() updateUserLocationDto: UpdateUserLocationDto): Promise<IdentityLocation> {
    return this.usersService.updateUserLocation(updateUserLocationDto,);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('location/delete/:id')
  @ApiOperation({ summary: 'Delete identity location info' })
  async removeIdentityLocation(@Param('id') id: string): Promise<void> {
    return this.usersService.removeIdentityLocation(id);
  }




  // gallery logic =============================================================

  // @UseGuards(JwtAuthGuard)
  @Post('user-cover-photos')
  @ApiOperation({ summary: 'Creating user cover photos table' })
  async createUserCoverPhoto(
    @Body() createUserCoverPhotoDto: CreateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    return this.usersService.createUserCoverPhoto(createUserCoverPhotoDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user-cover-photos')
  @ApiOperation({ summary: 'Fetching list of all user cover photo' })
  async findAllUserCoverPhoto(): Promise<UserCoverPhoto[]> {
    return this.usersService.findAllUserCoverPhoto();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user-cover-photos/:id')
  @ApiOperation({ summary: 'Fetching single user cover photo by id' })
  async findOneUserCoverPhoto(
    @Param('id') id: string,
  ): Promise<UserCoverPhoto> {
    return this.usersService.findOneUserCoverPhoto(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('user-cover-photos/:id')
  @ApiOperation({ summary: 'Updating user cover photos' })
  async updateUserCoverPhoto(
    @Param('id') id: string,
    @Body() updateUserCoverPhotoDto: UpdateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    return this.usersService.updateUserCoverPhoto(id, updateUserCoverPhotoDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('user-cover-photos/:id')
  @ApiOperation({ summary: 'Delete cover photo table from db' })
  async removeUserCoverPhoto(@Param('id') id: string): Promise<void> {
    return this.usersService.removeUserCoverPhoto(id);
  }
}
