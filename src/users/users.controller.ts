import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Query,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { CreateBrandDetailDto } from './dto/create-brand-detail.dto';
import { UpdateBrandDetailDto } from './dto/update-brand-detail.dto';
import { CreateIdentityDetailDto } from './dto/create-identity-detail.dto';
import { UpdateIdentityDetailDto } from './dto/update-identity-detail.dto';
import { CreateIdentityLocationDto } from './dto/create-identity-location.dto';
import { UpdateIdentityLocationDto } from './dto/update-identity-location.dto';
import { UpdateRegistrationsDto } from './dto/update-registration.dto';
import { CreateUserCoverPhotoDto } from './dto/create-user-coverphoto.dto';
import { UpdateUserCoverPhotoDto } from './dto/update-user-coverphoto.dto';
import { IdentityLocation } from './entity/identity-location.entity';
import { IdentityDetail } from './entity/identity-detail.entity';
import { BrandDetail } from './entity/brand-detail.entity';
import { Registration } from './entity/registration.entity';
import { UserCoverPhoto } from './entity/user-coverphoto.entity';
import { S3Service } from '../utils/s3.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateStatusDto} from "../common/common-dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('registration')
  @ApiOperation({ summary: 'Fetching registration detail list' })
  findAllRegistration(): Promise<Registration[]> {
    return this.usersService.findAllRegistration();
  }

  @UseGuards(JwtAuthGuard)
  @Get('registration/:id')
  @ApiOperation({ summary: 'Fetching single registration detail' })
  findOneRegistration(@Param('id') id: string): Promise<Registration> {
    return this.usersService.findOneRegistration(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('registration/:id')
  @ApiOperation({ summary: 'Updating registration related detail' })
  updateRegistration(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationsDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistration(id, updateRegistrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-registration-status/:id')
  @ApiOperation({ summary: 'Status Updating registration' })
  async updateRegistrationStatus(
      @Param('id') id: string,
      @Body() updateRegistrationStatusDto: UpdateStatusDto,
  ): Promise<Registration> {
    return this.usersService.updateRegistrationStatus(id, updateRegistrationStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('registration/:id')
  @ApiOperation({ summary: 'Delete a registration data or user' })
  removeRegistration(@Param('id') id: string): Promise<void> {
    return this.usersService.removeRegistration(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('registration-soft-delete/:id')
  @ApiOperation({ summary: 'Soft Deleting registration' })
  async softDeleteRegistration(@Param('id') id: string): Promise<boolean> {
    return this.usersService.softDeleteRegistration(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('identity-locations')
  @ApiOperation({ summary: 'Creating identity location info' })
  async createIdentityLocation(
    @Body() createIdentityLocationDto: CreateIdentityLocationDto,
  ): Promise<IdentityLocation> {
    return this.usersService.createIdentityLocation(createIdentityLocationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity-locations')
  @ApiOperation({ summary: 'Fetching all identity location' })
  async findAllIdentityLocation(): Promise<IdentityLocation[]> {
    return this.usersService.findAllIdentityLocation();
  }

  @UseGuards(JwtAuthGuard)
  @Get('nearby-influencer')
  @ApiOperation({ summary: 'Fetching all identity location' })
  async findAllNearbyInfluencer(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<IdentityLocation[]> {
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    if (isNaN(userLat) || isNaN(userLon)) {
      throw new BadRequestException('Invalid latitude or longitude');
    }
    return this.usersService.findAllNearbyInfluencer(userLat, userLon);
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity-locations/:id')
  @ApiOperation({ summary: 'Fetching identity location by id' })
  async findOneIdentityLocation(
    @Param('id') id: string,
  ): Promise<IdentityLocation> {
    return this.usersService.findOneIdentityLocation(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('identity-locations/:id')
  @ApiOperation({ summary: 'Updating identity location' })
  async updateIdentityLocation(
    @Param('id') id: string,
    @Body() updateIdentityLocationDto: UpdateIdentityLocationDto,
  ): Promise<IdentityLocation> {
    return this.usersService.updateIdentityLocation(
      id,
      updateIdentityLocationDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('identity-locations/:id')
  @ApiOperation({ summary: 'Delete identity location info' })
  async removeIdentityLocation(@Param('id') id: string): Promise<void> {
    return this.usersService.removeIdentityLocation(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('identity-detail')
  @ApiOperation({ summary: 'Creating identity details' })
  async createIdentityDetail(
    @Body() createIdentityDetailDto: CreateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    return this.usersService.createIdentityDetail(createIdentityDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity-detail/:id')
  @ApiOperation({ summary: 'Fetching single identity detail with id' })
  async findOneIdentityDetail(
    @Param('id') id: string,
  ): Promise<IdentityDetail> {
    return this.usersService.findOneIdentityDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity-detail')
  @ApiOperation({
    summary: 'Fetching all identity detail for particular registration',
  })
  async findAllIdentityDetail(@Req() req): Promise<IdentityDetail[]> {
    return this.usersService.findAllIdentityDetail(req.user.registration_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('identity-detail/:id')
  @ApiOperation({ summary: 'Updating identity related information' })
  async updateIdentityDetail(
    @Param('id') id: string,
    @Body() updateIdentityDetailDto: UpdateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityDetail(id, updateIdentityDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-identity-detail-status/:id')
  @ApiOperation({ summary: 'Status Updating identity details' })
  async updateIdentityDetailStatus(
      @Param('id') id: string,
      @Body() updateIdentityDetailsStatusDto: UpdateStatusDto,
  ): Promise<IdentityDetail> {
    return this.usersService.updateIdentityDetailStatus(id, updateIdentityDetailsStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('identity-detail/:id')
  @ApiOperation({ summary: 'Deleting identity detail' })
  async removeIdentityDetail(@Param('id') id: string): Promise<void> {
    return this.usersService.removeIdentityDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('identity-detail-soft-delete/:id')
  @ApiOperation({ summary: 'Soft Deleting identity detail' })
  async softDeleteIdentityDetail(@Param('id') id: string): Promise<boolean> {
    return this.usersService.softDeleteIdentityDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('brand-detail')
  @ApiOperation({ summary: 'creating brand related details' })
  async createBrandDetail(
    @Body() createBrandDetailDto: CreateBrandDetailDto,
  ): Promise<BrandDetail> {
    return this.usersService.createBrandDetail(createBrandDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('brand-detail')
  @ApiOperation({ summary: 'Fetching all brand details' })
  async findAllBrandDetail(): Promise<BrandDetail[]> {
    return this.usersService.findAllBrandDetail();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('brand-detail/:id')
  // @ApiOperation({ summary: 'Fetching all paid brand details' })
  // async findAllPaidBrandDetail(
  //   @Param('id') id: string,
  // ): Promise<BrandDetail[]> {
  //   return this.usersService.findAllPaidBrandDetail(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('brandDetails/:id')
  @ApiOperation({ summary: 'Fetching all brand details by params' })
  async findAllBrandsDetail(
    @Param('id') id: string,
  ): Promise<BrandDetail[]> {
    return this.usersService.findAllBrandsDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('brandByLocation')
  @ApiOperation({ summary: 'Fetching all Nearby brand details' })
  async findAllNearbyBrandDetail(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<BrandDetail[]> {
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    if (isNaN(userLat) || isNaN(userLon)) {
      throw new BadRequestException('Invalid latitude or longitude');
    }
    return this.usersService.findAllNearbyBrandDetail(userLat, userLon);
  }

  @UseGuards(JwtAuthGuard)
  @Get('brand-detail/:id')
  @ApiOperation({ summary: 'Fetching single brand details' })
  async findOneBrandDetail(@Param('id') id: string): Promise<BrandDetail> {
    return this.usersService.findOneBrandDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('brand-detail/:id')
  @ApiOperation({ summary: 'Updating brand details' })
  async updateBrandDetail(
    @Param('id') id: string,
    @Body() updateBrandDetailDto: UpdateBrandDetailDto,
  ): Promise<BrandDetail> {
    return this.usersService.updateBrandDetail(id, updateBrandDetailDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('brand-detail/:id')
  @ApiOperation({ summary: 'Deleting brand details' })
  async removeBrandDetail(@Param('id') id: string): Promise<void> {
    return this.usersService.removeBrandDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('user-cover-photos')
  @ApiOperation({ summary: 'Creating user cover photos table' })
  async createUserCoverPhoto(
    @Body() createUserCoverPhotoDto: CreateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    return this.usersService.createUserCoverPhoto(createUserCoverPhotoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-cover-photos')
  @ApiOperation({ summary: 'Fetching list of all user coverphoto' })
  async findAllUserCoverPhoto(): Promise<UserCoverPhoto[]> {
    return this.usersService.findAllUserCoverPhoto();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-cover-photos/:id')
  @ApiOperation({ summary: 'Fetching single user coverphoto by id' })
  async findOneUserCoverPhoto(
    @Param('id') id: string,
  ): Promise<UserCoverPhoto> {
    return this.usersService.findOneUserCoverPhoto(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user-cover-photos/:id')
  @ApiOperation({ summary: 'Updating user cover photos' })
  async updateUserCoverPhoto(
    @Param('id') id: string,
    @Body() updateUserCoverPhotoDto: UpdateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    return this.usersService.updateUserCoverPhoto(id, updateUserCoverPhotoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user-cover-photos/:id')
  @ApiOperation({ summary: 'Delete cover photo table from db' })
  async removeUserCoverPhoto(@Param('id') id: string): Promise<void> {
    return this.usersService.removeUserCoverPhoto(id);
  }
}
