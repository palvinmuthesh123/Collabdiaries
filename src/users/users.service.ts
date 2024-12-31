import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';
import {CreateIdentityDetailDto} from './dto/identity/create-identity-detail.dto';
import {UpdateIdentityDetailDto} from './dto/identity/update-identity-detail.dto';
import {CreateIdentityLocationDto} from './dto/location/create-identity-location.dto';
import {CreateUserCoverPhotoDto} from './dto/create-user-coverphoto.dto';
import {UpdateUserCoverPhotoDto} from './dto/update-user-coverphoto.dto';
import {UpdateRegistrationsDto} from './dto/registrations/update-registration.dto';
import {IdentityDetail} from './entity/identity-detail.entity';
import {IdentityLocation} from './entity/location.entity';
import {Registration} from './entity/registration.entity';
import {UserCoverPhoto} from './entity/user-coverphoto.entity';
import {UpdateStatusDto} from "../common/common-dto";
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import {DealType, LocationType, UserStatus, UserType} from "../common/enum";
import {BlockRegisterDto} from "./dto/registrations/block-register.dto";
import {UpdateRegistrationProfileDto} from "./dto/registrations/update-registration-profile.dto";
import {VerifyUsernameDto} from "./dto/registrations/verify-username.dto";
import * as QRCode from 'qrcode';
import {UpdateDealTypeDto} from "./dto/identity/update-deal-type.dto";
import {UpdateBrandModeDto} from "./dto/identity/update-brand-mode.dto";
import {UpdateBrandOwnershipDto} from "./dto/identity/update-brand-ownership";
import {UpdateBrandLocationDto} from "./dto/location/update-brand-location.dto";
import {UpdateUserLocationDto} from "./dto/location/update-user-location.dto";
import {UpdateRegistrationCoverImageDto} from "./dto/registrations/update-registration-cover-image.dto";
import {UpdateIdentityProfileDto} from "./dto/identity/update-identity-profile.dto";
import {NearbyBrandAndInfluencerDto} from "./dto/location/nearby-influencer.dto";

@Injectable()
export class UsersService {
  private envPath = path.resolve(__dirname, '../../.env');
  private influencerThreshold: number;
  constructor(
    @InjectRepository(IdentityDetail)
    private readonly identityDetailRepository: Repository<IdentityDetail>,
    @InjectRepository(IdentityLocation)
    private readonly identityLocationRepository: Repository<IdentityLocation>,
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(UserCoverPhoto)
    private userCoverPhotoRepository: Repository<UserCoverPhoto>,
  ) {
    dotenv.config({ path: this.envPath });
    this.influencerThreshold = parseInt(process.env.INFLUENCER_THRESHOLD || '1000', 10);
   }

  async commonFindOneRegistrationWithSafetyConditions(id: string): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id, is_deleted: false }
    })
    if (!registerUser) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    if (registerUser.status === UserStatus.disable) { throw new NotFoundException(`Registration with ID ${id} status is disable`); }
    return registerUser;
  }

  async verifyUsername(inputData:VerifyUsernameDto):Promise<{msg:string}>{
    if (inputData.user_type === UserType.CollabUser){
      const getUsername = await this.registrationRepository.findOne({where:{user_name:inputData.user_type}});
      return {msg:'user_name is already exist'}
    }
    const getBrandUsername = await this.identityDetailRepository.findOne({where:{user_name:inputData.user_type}});
    return {msg:'user_name is already exist'}
  }

  async findAllRegistration(search: string): Promise<Registration[]> {
    const queryBuilder = this.registrationRepository.createQueryBuilder('registration');
    queryBuilder
      .where('registration.is_deleted = :isDeleted', { isDeleted: false })
      .andWhere('registration.status IN (:...statuses)', {
        statuses: [UserStatus.active, UserStatus.hold, UserStatus.disable],
      });
    if (search) {
      queryBuilder.andWhere(
        '(LOWER(registration.name) LIKE :search OR LOWER(registration.user_name) LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    queryBuilder.leftJoinAndSelect('registration.identityDetails', 'identityDetails');
    return await queryBuilder.getMany();
  }

  async findOneRegistration(id: string): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id, is_deleted: false,status:Not(UserStatus.hide) }, relations: ['identityDetails','userCoverPhotos','identitylocation']
    });
    if (registerUser) return registerUser
    throw new NotFoundException(`Registration with ID ${id} not found`);
  }

  async updateRegistration(
    id: string,
    updateRegistrationDto: UpdateRegistrationsDto,
  ): Promise<Registration> {
    const user = await this.commonFindOneRegistrationWithSafetyConditions(id)
    if (user) {
      await this.registrationRepository.update(id, updateRegistrationDto);
      return this.findOneRegistration(id);
    }
  }

  async updateRegistrationStatus(
    id: string,
    updateRegistrationStatusDto: UpdateStatusDto,
  ): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id,is_deleted:false },
    });
    if (!registerUser) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    Object.assign(registerUser, updateRegistrationStatusDto);
    return this.registrationRepository.save(registerUser);
  }

  async updateRegistrationProfile(
      id: string,
      updateRegistrationProfileDto: UpdateRegistrationProfileDto,
  ): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id },
    });
    if (!registerUser) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    Object.assign(registerUser, updateRegistrationProfileDto);
    return this.registrationRepository.save(registerUser);
  }

  async updateRegistrationCoverImage(
      id: string,
      inputData: UpdateRegistrationCoverImageDto,
  ): Promise<Registration> {
    if (!inputData.main_cover_image || inputData.cover_images.length <= 0) {
      throw new BadRequestException('Please provide at least one input');
    }
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id, is_deleted: false },
    });
    if (!registerUser) throw new NotFoundException(`Registration with ID ${id} not found`);
    if (!registerUser.cover_image_details) {
      registerUser.cover_image_details = {
        main_cover_image: '',
        cover_images: [],
      };
    }
    registerUser.cover_image_details.main_cover_image = inputData.main_cover_image;
    registerUser.cover_image_details.cover_images = inputData.cover_images;
    return this.registrationRepository.save(registerUser);
  }

  async blockUser(id:string, blockRegister:BlockRegisterDto): Promise<void> {
    const user = await this.registrationRepository.findOne({ where: { registration_id:id } });
    if (!user) throw new Error('User not found');
    user.is_blocked = true;
    user.block_reason = blockRegister.reason || null;
    user.blocked_at = new Date();
    await this.registrationRepository.save(user);
  }

  async unBlockUser(id:string, unblockRegister:BlockRegisterDto): Promise<void> {
    const user = await this.registrationRepository.findOne({ where: { registration_id:id } });
    if (!user) throw new Error('User not found');
    user.is_blocked = false;
    user.block_reason = unblockRegister.reason || null;
    user.blocked_at = new Date();
    await this.registrationRepository.save(user);
  }

  async softDeleteAllIdentityDetailsWithRegistration(
      registrationId: string,
  ): Promise<void> {
    await this.identityDetailRepository.update(
        { registration_id: registrationId }, // Update where registration_id is in the list
        { is_deleted: false },
    );
  }

  async softDeleteRegistration(id: string): Promise<boolean> {
    const softDelete = await this.registrationRepository.update(id, { is_deleted: false });
    if (softDelete) {
      await this.softDeleteAllIdentityDetailsWithRegistration(id)
      return true
    } throw new NotFoundException(`Registration with ID ${id} not found`);
  }

  async createIdentityLocation(
    createIdentityLocationDto: CreateIdentityLocationDto,
  ): Promise<IdentityLocation> {
    const identityLocation = this.identityLocationRepository.create(
      createIdentityLocationDto,
    );
    return await this.identityLocationRepository.save(identityLocation);
  }

  async ChangeThreshold(newThreshold: number): Promise<void> {
    process.env.INFLUENCER_THRESHOLD = newThreshold.toString();
    this.saveToEnvFile('INFLUENCER_THRESHOLD', newThreshold.toString());
  }

  async GetThreshold(): Promise<number> {
    return parseInt(process.env.INFLUENCER_THRESHOLD)
  }

  private saveToEnvFile(key: string, value: string): void {
    let envContent = '';
    if (fs.existsSync(this.envPath)) {
      envContent = fs.readFileSync(this.envPath, 'utf8');
    }
    const envLines = envContent.split('\n');
    const updatedLines = new Map<string, string>();
    for (const line of envLines) {
      const [existingKey, ...existingValueParts] = line.split('=');
      if (existingKey) {
        updatedLines.set(existingKey.trim(), existingValueParts.join('=').trim());
      }
    }
    updatedLines.set(key, value);
    const newEnvContent = Array.from(updatedLines.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');
    fs.writeFileSync(this.envPath, newEnvContent, 'utf8');
  }

  // this function is run automatic with cron-job
  async updateReferralCount():Promise<void> {
    const users = await this.registrationRepository.find({where:{ referral_code: Not(null),}});
    for (const user of users) {
      const brandCount = await this.identityDetailRepository.count({where:{referral_by_code:user.referral_code,user_type:UserType.Brand}})
      const userCount = await this.identityDetailRepository.count({where:{referral_by_code:user.referral_code,user_type:UserType.CollabUser}})
      const referralDetails = await this.registrationRepository.findOne({
        where: { referral_code: user.referral_code },
      });
      referralDetails.total_brand_by_referral = brandCount;
      referralDetails.total_user_by_referral = userCount;
      await this.registrationRepository.save(referralDetails);
    }
  }

// Start identity logic ======================================================================

  async generateBrandQRCode(url:string):Promise<string>{
    const qrCode = QRCode.toDataURL(url);
    if (qrCode) return qrCode
    throw new NotFoundException('QR Code link is not generated');
  }

  async createIdentityDetail(
    createIdentityDetailDto: CreateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    if (createIdentityDetailDto.user_type === UserType.CollabUser) throw new BadRequestException('here only brand is created not user')
    const checkUsername = await this.identityDetailRepository.findOne({where:{user_name:createIdentityDetailDto.user_name}})
    if (checkUsername) throw new  BadRequestException('this username is already exist')
    if (createIdentityDetailDto.is_online === true) {
      if (!createIdentityDetailDto.weblink || createIdentityDetailDto.weblink.trim() === '') {
        throw new Error('Weblink is required when the brand is online.');
      }
      const identityDetail = this.identityDetailRepository.create(createIdentityDetailDto);
      identityDetail.qr_code_link = await this.generateBrandQRCode(createIdentityDetailDto.brand_home_page_url)
      identityDetail.deal_type = [DealType.Barter, DealType.Paid, DealType.Unpaid]
      return this.identityDetailRepository.save(identityDetail);
    }
    const identityDetail = this.identityDetailRepository.create(createIdentityDetailDto);
    identityDetail.qr_code_link = await this.generateBrandQRCode(createIdentityDetailDto.brand_home_page_url)
    return this.identityDetailRepository.save(identityDetail);
  }

  async findAll(): Promise<IdentityDetail[]> {
    return this.identityDetailRepository.find({
      where: {is_deleted: false, status: Not(UserStatus.hide)}
    });
  }

  async commonFindOneIdentityDetailWithSafetyConditions(id: string): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id, is_deleted: false }, relations: ['registration','identitylocation','identityCoverPhotos','notificationSetting']
    })
    if (!identityDetail) {
      throw new NotFoundException(`IdentityDetail with ID ${id} not found`);
    }
    if (identityDetail.status === UserStatus.disable) { throw new NotFoundException(`IdentityDetail with ID ${id} status is disable`); }
    return identityDetail;
  }

  async findOne(id: string): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id, is_deleted: false }, relations: ['registration','identitylocation','identityCoverPhotos','notificationSetting'],
    });
    if (!identityDetail) {
      throw new NotFoundException(`IdentityDetail with ID ${id} not found`);
    }
    return identityDetail;
  }

  async updateIdentityDetail(
    id: string,
    updateIdentityDetailDto: UpdateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    const identityDetail = await this.commonFindOneIdentityDetailWithSafetyConditions(id)
    Object.assign(identityDetail, updateIdentityDetailDto);
    return this.identityDetailRepository.save(identityDetail);
  }

  async updateDealType(id:string,updateDealType:UpdateDealTypeDto):Promise<boolean>{
    const validDealTypes = [];
    for (const dealType of updateDealType.deal_type) {
      if (dealType === DealType.Barter || DealType.Paid || DealType.Unpaid) {
        validDealTypes.push(dealType)
      }
      throw new BadRequestException('Invalid deal type provided.');
    }
    const identityDetail = await this.identityDetailRepository.findOne({ where: { identity_id: id } });
    if (!identityDetail) throw new BadRequestException('IdentityDetail not found.');
    identityDetail.deal_type = validDealTypes;
    const result = await this.identityDetailRepository.save(identityDetail);
    if (result) return  !!result
  }

  async updateBrandMode(id:string, updateBrandMode:UpdateBrandModeDto){
    if (updateBrandMode.is_online === true){
      if (!updateBrandMode.weblink || updateBrandMode.weblink.trim() === '') {
        throw new Error('Weblink is required when the brand is online.');
      }
      const identityDetail = await this.identityDetailRepository.findOne({ where: { identity_id: id } });
      if (!identityDetail) throw new BadRequestException('IdentityDetail not found.');
      identityDetail.is_online = updateBrandMode.is_online;
      identityDetail.weblink = updateBrandMode.weblink;
      const result = await this.identityDetailRepository.save(identityDetail);
      if (result) return  !!result
    }
    const identityDetail = await this.identityDetailRepository.findOne({ where: { identity_id: id } });
    if (!identityDetail) throw new BadRequestException('IdentityDetail not found.');
    identityDetail.is_online = updateBrandMode.is_online;
    identityDetail.weblink = null;
    const result = await this.identityDetailRepository.save(identityDetail);
    if (result) return  !!result
  }

  async transferBrandOwnership(updateBrandOwner: UpdateBrandOwnershipDto): Promise<string> {
  const brand = await this.identityDetailRepository.findOne({ where: { identity_id: updateBrandOwner.identity_id ,is_deleted:false,user_type:UserType.Brand} });
  if (!brand) throw new NotFoundException('brand is not found')
  const newOwnerDetails = await this.identityDetailRepository.findOne({
    where: { registration_id: updateBrandOwner.new_owner_registration_id },
  });
  if (!newOwnerDetails) throw new NotFoundException('New owner not found');
  brand.registration_id = newOwnerDetails.registration_id;
  await this.identityDetailRepository.save(brand);
  return `Ownership of brand ID "${updateBrandOwner.identity_id}" has been successfully transferred to "${updateBrandOwner.new_owner_registration_id}".`;
}

  async particularUserBrands(id: string): Promise<IdentityDetail[]> {
    return this.identityDetailRepository.find({
      where: { registration_id: id, is_deleted: false}, relations: ['registration','identitylocation','identityCoverPhotos','notificationSetting']});
  }

  async updateIdentityProfileImage(id: string,inputData: UpdateIdentityProfileDto): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
    });
    if (!identityDetail) {
      throw new NotFoundException(`Identity detail with ID ${id} not found`);
    }
    Object.assign(identityDetail, inputData);
    return this.identityDetailRepository.save(identityDetail);
  }


  async updateIdentityCoverImage(
      id: string,
      inputData: UpdateRegistrationCoverImageDto,
  ): Promise<IdentityDetail> {
    if (!inputData.main_cover_image || inputData.cover_images.length <= 0) {
      throw new BadRequestException('Please provide at least one input');
    }
    const identityDetails = await this.identityDetailRepository.findOne({
      where: { registration_id: id, is_deleted: false },
    });
    if (!identityDetails) throw new NotFoundException(`IdentityDetails with ID ${id} not found`);
    if (!identityDetails.cover_image_details) {
      identityDetails.cover_image_details = {
        main_cover_image: '',
        cover_images: [],
      };
    }
    identityDetails.cover_image_details.main_cover_image = inputData.main_cover_image;
    identityDetails.cover_image_details.cover_images = inputData.cover_images;
    return this.identityDetailRepository.save(identityDetails);
  }

  async updateIdentityDetailStatus(
    id: string,
    updateIdentityDetailsStatusDto: UpdateStatusDto,
  ): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
    });
    if (!identityDetail) {
      throw new NotFoundException(`Identity detail with ID ${id} not found`);
    }
    Object.assign(identityDetail, updateIdentityDetailsStatusDto);
    return this.identityDetailRepository.save(identityDetail);
  }

  async softDeleteIdentityDetail(id: string): Promise<boolean> {
    const identityDetails = await this.identityDetailRepository.findOne({where:{identity_id:id,is_deleted:false}})
    if (!identityDetails) throw new NotFoundException('this identity is already deleted')
    if (identityDetails.user_type === UserType.CollabUser){
      await this.softDeleteAllIdentityDetailsWithRegistration(identityDetails.registration_id)
    }
    const softDelete = await this.identityDetailRepository.update(id, { is_deleted: false });
    if (!softDelete) throw new NotFoundException(`IdentityDetail with ID ${id} not found`);
    return true
  }

//========================location =================================================

  async createBrandLocation(locationInput: CreateIdentityLocationDto): Promise<IdentityLocation> {
    if (!locationInput.identity_id) throw new BadRequestException('Brand ID is required');
    const brand = await this.identityDetailRepository.findOne({
      where: { identity_id: locationInput.identity_id, user_type: UserType.Brand, is_deleted: false },
    });
    if (!brand) throw new NotFoundException('Brand does not exist');
    locationInput.registration_id = null;
    const existingLocation = await this.identityLocationRepository.findOne({
      where: { identity_id: locationInput.identity_id, is_deleted: false },
    });
    if (existingLocation) {
      Object.assign(existingLocation, locationInput);
      return await this.identityLocationRepository.save(existingLocation);
    }
    const newLocation = this.identityLocationRepository.create({
      ...locationInput,
      location_type:UserType.Brand,
    });
    return await this.identityLocationRepository.save(newLocation);
  }

  async createUserLocation(locationInput: CreateIdentityLocationDto): Promise<IdentityLocation[]> {
    const userLocation = [];
    if (!locationInput.registration_id) throw new BadRequestException('User ID is required');
    for (const locationType of [LocationType.current, LocationType.permanent]) {
      const user = await this.identityDetailRepository.findOne({where: { registration_id: locationInput.registration_id, user_type: UserType.CollabUser, is_deleted: false }});
      if (!user) throw new NotFoundException('User does not exist');
      const existingLocation = await this.identityLocationRepository.findOne({
        where: { identity_id: user.identity_id, registration_id: locationInput.registration_id, locationType, is_deleted: false }
      });
      if (existingLocation) {
        locationInput.identity_id = null;
        Object.assign(existingLocation, locationInput);
        const updatedLocation = await this.identityLocationRepository.save(existingLocation);
        userLocation.push(updatedLocation);
      } else {
        locationInput.identity_id = null;
        const newLocation = this.identityLocationRepository.create({...locationInput,locationType:locationType,location_type:UserType.CollabUser});
        const savedLocation = await this.identityLocationRepository.save(newLocation);
        userLocation.push(savedLocation);
      }
    }
    return userLocation;
  }

  async findAllIdentityLocation(): Promise<IdentityLocation[]> {
    return await this.identityLocationRepository.find({where:{is_deleted:false}});
  }

  async findAllNearbyInfluencer(inputData:NearbyBrandAndInfluencerDto): Promise<IdentityLocation[]> {
    const {userLat,userLon,radius} = inputData
    const query = this.identityLocationRepository
        .createQueryBuilder('identity_location')
        .addSelect(
            `6371 * acos(
          cos(radians(:userLat)) *
          cos(radians(CAST(identity_location.latitude AS double precision))) *
          cos(radians(CAST(identity_location.longitude AS double precision)) - radians(:userLon)) +
          sin(radians(:userLat)) *
          sin(radians(CAST(identity_location.latitude AS double precision)))
        )`,
            'distance',
        )
        .innerJoinAndSelect('identity_location.identity_detail', 'identityDetail')
        .innerJoin(
            'identityDetail.socialIdentityCount',
            'socialIdentityCount',
            'socialIdentityCount.follower_count > :minFollowerCount',
            { minFollowerCount: this.influencerThreshold },
        )
        .where(
            `6371 * acos(
          cos(radians(:userLat)) *
          cos(radians(CAST(identity_location.latitude AS double precision))) *
          cos(radians(CAST(identity_location.longitude AS double precision)) - radians(:userLon)) +
          sin(radians(:userLat)) *
          sin(radians(CAST(identity_location.latitude AS double precision)))
        ) <= :radius`,
        )
        .setParameters({ userLat, userLon, radius })
        .orderBy('distance', 'ASC');
    return await query.getMany();
  }

  async findAllNearbyBrandDetail(inputData: NearbyBrandAndInfluencerDto): Promise<IdentityDetail[]> {
    const { userLat, userLon, radius } = inputData;
    const query = this.identityDetailRepository
        .createQueryBuilder('identityDetail')
        .addSelect(
            `6371 * acos(
        cos(radians(:userLat)) *
        cos(radians(CAST(identity_location.latitude AS double precision))) *
        cos(radians(CAST(identity_location.longitude AS double precision)) - radians(:userLon)) +
        sin(radians(:userLat)) *
        sin(radians(CAST(identity_location.latitude AS double precision)))
      )`,
            'distance',
        )
        .leftJoinAndSelect('identityDetail.identitylocation', 'identity_location') // Correctly join identity_location with 'identity_location' alias
        .leftJoinAndSelect('identityDetail.registration', 'registration') // Load registration relation
        .where(
            `6371 * acos(
        cos(radians(:userLat)) *
        cos(radians(CAST(identity_location.latitude AS double precision))) *
        cos(radians(CAST(identity_location.longitude AS double precision)) - radians(:userLon)) +
        sin(radians(:userLat)) *
        sin(radians(CAST(identity_location.latitude AS double precision)))
      ) <= :radius`,
        )
        .setParameters({ userLat, userLon, radius })
        .orderBy('distance', 'ASC');

    return await query.getMany();
  }


  async findOneIdentityLocation(id: string): Promise<IdentityLocation> {
    const identityLocation = await this.identityLocationRepository.findOne({where: { location_id: id,is_deleted:false }});
    if (!identityLocation) {
      throw new NotFoundException(`IdentityLocation with ID ${id} not found`);
    }
    return identityLocation;
  }

  async updateBrandLocation(updateBrandLocationDto: UpdateBrandLocationDto): Promise<IdentityLocation> {
    const existingLocation = await this.identityLocationRepository.findOne({
      where: { identity_id: updateBrandLocationDto.identity_id,is_deleted:false },
    });
    if (!existingLocation) throw new NotFoundException('Location not found for the given Identity ID');
    Object.assign(existingLocation, updateBrandLocationDto);
    return await this.identityLocationRepository.save(existingLocation);
  }

  async updateUserLocation(updateUserLocationDto: UpdateUserLocationDto): Promise<IdentityLocation> {
    if (!updateUserLocationDto.registration_id || !updateUserLocationDto.locationType) throw new BadRequestException('Registration_id and location_type both are required')
    const existingLocation = await this.identityLocationRepository.findOne({
      where: { registration_id: updateUserLocationDto.registration_id, locationType:updateUserLocationDto.locationType,is_deleted:false },
    });
    if (!existingLocation) throw new NotFoundException('Location not found for the given User ID');
    Object.assign(existingLocation, updateUserLocationDto);
    return await this.identityLocationRepository.save(existingLocation);
  }

  async removeIdentityLocation(id: string): Promise<void> {
    const identityLocation = await this.identityLocationRepository.findOne({ where: { location_id: id } });
    if (!identityLocation) {
      throw new NotFoundException(`IdentityLocation with ID ${id} not found`);
    }
    await this.identityLocationRepository.delete({ location_id: id });
  }


// cover photo logic =============================================================================================





  async createUserCoverPhoto(
    createUserCoverPhotoDto: CreateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    const newCoverPhoto = this.userCoverPhotoRepository.create(
      createUserCoverPhotoDto,
    );
    return this.userCoverPhotoRepository.save(newCoverPhoto);
  }

  async findAllUserCoverPhoto(): Promise<UserCoverPhoto[]> {
    return this.userCoverPhotoRepository.find({
      relations: ['registration', 'identityDetail'],
    }); // Include related entities
  }

  async findOneUserCoverPhoto(id: string): Promise<UserCoverPhoto> {
    const coverPhoto = await this.userCoverPhotoRepository.findOne({
      where: { cover_photos_id: id },
      relations: ['registration', 'identityDetail'],
    });
    if (!coverPhoto) {
      throw new NotFoundException('User  cover photo not found');
    }
    return coverPhoto;
  }

  async updateUserCoverPhoto(
    id: string,
    updateUserCoverPhotoDto: UpdateUserCoverPhotoDto,
  ): Promise<UserCoverPhoto> {
    const getdata = await this.findOneUserCoverPhoto(id); // Check if the cover photo exists
    if (
      updateUserCoverPhotoDto.link &&
      getdata.link &&
      getdata.link.length > 0
    ) {
      updateUserCoverPhotoDto.link.concat(getdata.link);
    }
    await this.userCoverPhotoRepository.update(id, updateUserCoverPhotoDto);
    return this.userCoverPhotoRepository.findOne({
      where: { cover_photos_id: id },
      relations: ['registration', 'identityDetail'],
    });
  }

  async removeUserCoverPhoto(id: string): Promise<void> {
    const coverPhoto = await this.findOneUserCoverPhoto(id);
    await this.userCoverPhotoRepository.remove(coverPhoto);
  }
}
