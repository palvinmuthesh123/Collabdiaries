import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {CreateBrandDetailDto} from './dto/create-brand-detail.dto';
import {UpdateBrandDetailDto} from './dto/update-brand-detail.dto';
import {CreateIdentityDetailDto} from './dto/create-identity-detail.dto';
import {UpdateIdentityDetailDto} from './dto/update-identity-detail.dto';
import {CreateIdentityLocationDto} from './dto/create-identity-location.dto';
import {UpdateIdentityLocationDto} from './dto/update-identity-location.dto';
import {CreateUserCoverPhotoDto} from './dto/create-user-coverphoto.dto';
import {UpdateUserCoverPhotoDto} from './dto/update-user-coverphoto.dto';
import {CreateRegistrationsDto} from './dto/create-registration.dto';
import {UpdateRegistrationsDto} from './dto/update-registration.dto';
import {BrandDetail} from './entity/brand-detail.entity';
import {IdentityDetail} from './entity/identity-detail.entity';
import {IdentityLocation} from './entity/identity-location.entity';
import {Registration} from './entity/registration.entity';
import {UserCoverPhoto} from './entity/user-coverphoto.entity';
import {UpdateStatusDto} from "../common/common-dto";
import {UpdateBrandOwnershipDto} from "./dto/update-brand-ownership";
import {UserStatus} from "../common/enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(BrandDetail)
    private brandDetailRepository: Repository<BrandDetail>,
    @InjectRepository(IdentityDetail)
    private readonly identityDetailRepository: Repository<IdentityDetail>,
    @InjectRepository(IdentityLocation)
    private readonly identityLocationRepository: Repository<IdentityLocation>,
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(UserCoverPhoto)
    private userCoverPhotoRepository: Repository<UserCoverPhoto>,
  ) {}

  async createRegistration(
    createRegistrationDto: CreateRegistrationsDto,
  ): Promise<Registration> {
    const registration = this.registrationRepository.create(
      createRegistrationDto,
    );
    return this.registrationRepository.save(registration);
  }

  async commonFindOneRegistrationWithSafetyConditions(id:string): Promise<Registration>{
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id,is_deleted:false }
    })
    if (!registerUser) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    if (registerUser.status === UserStatus.disable){ throw new NotFoundException(`Registration with ID ${id} status is disable`);}
    return registerUser;
  }

  async findAllRegistration(): Promise<Registration[]> {
    return this.registrationRepository.find({
      where: {is_deleted:false,status:In([UserStatus.active,UserStatus.hold,UserStatus.disable])},relations: ['identityDetails'],
    });
  }

  async findOneRegistration(id: string): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id,is_deleted:false },relations:['identityDetails']
    });
    if (registerUser) return registerUser
    throw new NotFoundException(`Registration with ID ${id} not found`);
  }

  async updateRegistration(
    id: string,
    updateRegistrationDto: UpdateRegistrationsDto,
  ): Promise<Registration> {
    const user = await this.commonFindOneRegistrationWithSafetyConditions(id)
    if(user) {
      await this.registrationRepository.update(id, updateRegistrationDto);
      return this.findOneRegistration(id);
    }
  }

  async updateRegistrationStatus(
      id: string,
      updateRegistrationStatusDto: UpdateStatusDto,
  ): Promise<Registration> {
    const registerUser = await this.registrationRepository.findOne({
      where: { registration_id: id },
    });
    if (!registerUser) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    Object.assign(registerUser, updateRegistrationStatusDto);
    return this.identityDetailRepository.save(registerUser);
  }

  async removeRegistration(id: string): Promise<void> {
    await this.registrationRepository.delete(id);
  }

  async softDeleteRegistration(id: string): Promise<boolean> {
    const softDelete = await this.registrationRepository.update(id, { is_deleted: true });
    if (softDelete){
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

  async findAllIdentityLocation(): Promise<IdentityLocation[]> {
    return await this.identityLocationRepository.find();
  }

  async findAllNearbyInfluencer(
    userLat: number,
    userLon: number,
    radius: number = 20,
  ): Promise<IdentityLocation[]> {
    const query = this.identityLocationRepository
    .createQueryBuilder('identityLocation')
    .addSelect(
      `6371 * acos(
        cos(radians(:userLat)) *
        cos(radians(CAST(identityLocation.latitude AS double precision))) *
        cos(radians(CAST(identityLocation.longitude AS double precision)) - radians(:userLon)) +
        sin(radians(:userLat)) *
        sin(radians(CAST(identityLocation.latitude AS double precision)))
      )`,
      'distance',
    )
    .where(
      `6371 * acos(
        cos(radians(:userLat)) *
        cos(radians(CAST(identityLocation.latitude AS double precision))) *
        cos(radians(CAST(identityLocation.longitude AS double precision)) - radians(:userLon)) +
        sin(radians(:userLat)) *
        sin(radians(CAST(identityLocation.latitude AS double precision)))
      ) <= :radius`,
    )
    .setParameters({ userLat, userLon, radius })
    .leftJoinAndSelect('identityLocation.identity_detail', 'identityDetail') // Include IdentityDetail relation
    .leftJoinAndSelect('identityLocation.registration', 'registration') // Include Registration relation
    .orderBy('distance', 'ASC');
    return await query.getMany();
  }

  async findOneIdentityLocation(id: string): Promise<IdentityLocation> {
    const identityLocation = await this.identityLocationRepository.findOne({
      where: { identity_location_id: id },
    });
    if (!identityLocation) {
      throw new NotFoundException(`IdentityLocation with ID ${id} not found`);
    }
    return identityLocation;
  }

  async updateIdentityLocation(
    id: string,
    updateIdentityLocationDto: UpdateIdentityLocationDto,
  ): Promise<IdentityLocation> {
    await this.findOneIdentityLocation(id); // Check if the identity location exists
    await this.identityLocationRepository.update(id, updateIdentityLocationDto);
    return this.findOneIdentityLocation(id); // Return the updated entity
  }

  async removeIdentityLocation(id: string): Promise<void> {
    const identityLocation = await this.findOneIdentityLocation(id); // Check if the identity location exists
    await this.identityLocationRepository.remove(identityLocation);
  }

  async createIdentityDetail(
    createIdentityDetailDto: CreateIdentityDetailDto,
  ): Promise<IdentityDetail> {
    const identityDetail = this.identityDetailRepository.create(
      createIdentityDetailDto,
    );
    return this.identityDetailRepository.save(identityDetail);
  }

  async commonFindOneIdentityDetailWithSafetyConditions(id:string): Promise<IdentityDetail>{
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id,is_deleted:false }
    })
    if (!identityDetail) {
      throw new NotFoundException(`IdentityDetail with ID ${id} not found`);
    }
    if (identityDetail.status === UserStatus.disable){ throw new NotFoundException(`IdentityDetail with ID ${id} status is disable`);}
    return identityDetail;
  }

  async findOneIdentityDetail(id: string): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id,is_deleted:false },relations: ['identitylocation'],
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

  async removeIdentityDetail(id: string): Promise<void> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
    }); // Check if it exists
    await this.identityDetailRepository.remove(identityDetail);
  }

  async softDeleteAllIdentityDetailsWithRegistration(
      registrationId: string,
  ): Promise<void> {
    await this.identityDetailRepository.update(
        { registration_id: registrationId }, // Update where registration_id is in the list
        { is_deleted: true },
    );
  }



  async softDeleteIdentityDetail(id: string): Promise<boolean> {
    const softDelete = await this.identityDetailRepository.update(id, { is_deleted: true });
   if (!softDelete) throw new NotFoundException(`IdentityDetail with ID ${id} not found`);
    return true
  }


  async findAllIdentityDetail(id: string): Promise<IdentityDetail[]> {
    return this.identityDetailRepository.find({
      where: { registration_id: id,is_deleted:false,status:In([UserStatus.active,UserStatus.hold,UserStatus.disable]) }
    });
  }

  async createBrandDetail(
    createBrandDetailDto: CreateBrandDetailDto,
  ): Promise<BrandDetail> {
    const newBrandDetail =
      this.brandDetailRepository.create(createBrandDetailDto);
    return this.brandDetailRepository.save(newBrandDetail);
  }

  async findAllBrandsDetail(id: string): Promise<BrandDetail[]> {
    let whereParams = {}
    switch(id) {
      case 'paid':
        Object.assign(whereParams, {paid: true});
        break;
      case 'unpaid':
        Object.assign(whereParams, {paid: false});
        break;
      case 'barter':
        Object.assign(whereParams, {barter: true});
        break;
      default:
        break;
    }
    return this.brandDetailRepository.find({
      where: whereParams,
      // relations: ['identityDetail', 'registration', 'category'],
      relations: ['identityDetail', 'registration'],
    });
  }

  async findAllNearbyBrandDetail(
    userLat: number,
    userLon: number,
    radius: number = 20,
  ): Promise<BrandDetail[]> {
    const query = this.brandDetailRepository
      .createQueryBuilder('brandDetail')
      .addSelect(
        `6371 * acos(
            cos(radians(:userLat)) *
            cos(radians(CAST(brandDetail.latitude AS double precision))) *
            cos(radians(CAST(brandDetail.longitude AS double precision)) - radians(:userLon)) +
            sin(radians(:userLat)) *
            sin(radians(CAST(brandDetail.latitude AS double precision)))
        )`,
        'distance',
      )
      .where(
        `6371 * acos(
            cos(radians(:userLat)) *
            cos(radians(CAST(brandDetail.latitude AS double precision))) *
            cos(radians(CAST(brandDetail.longitude AS double precision)) - radians(:userLon)) +
            sin(radians(:userLat)) *
            sin(radians(CAST(brandDetail.latitude AS double precision)))
        ) <= :radius`,
      )
      .setParameters({ userLat, userLon, radius })
      .leftJoinAndSelect('brandDetail.identityDetail', 'identityDetail') // Load identityDetail relation
      .leftJoinAndSelect('brandDetail.registration', 'registration') // Load registration relation
      .orderBy('distance', 'ASC');
  
    return await query.getMany();
  }

  async findAllBrandDetail(): Promise<BrandDetail[]> {
    return this.brandDetailRepository.find({
      // relations: ['identityDetail', 'registration', 'category'],
      relations: ['identityDetail', 'registration'],
    });
  }

  async findOneBrandDetail(id: string): Promise<BrandDetail> {
    const brandDetail = await this.brandDetailRepository.findOne({
      where: { brand_id: id },
      // relations: ['identityDetail', 'registration', 'category'],
      relations: ['identityDetail', 'registration'],
    });
    if (!brandDetail) {
      throw new NotFoundException('Brand detail not found');
    }
    return brandDetail;
  }

  async updateBrandDetail(
    id: string,
    updateBrandDetailDto: UpdateBrandDetailDto,
  ): Promise<BrandDetail> {
    await this.findOneBrandDetail(id); // Check if the brand detail exists
    await this.brandDetailRepository.update(id, updateBrandDetailDto);
    return this.brandDetailRepository.findOne({
      where: { brand_id: id },
      // relations: ['identityDetail', 'registration', 'category'],
      relations: ['identityDetail', 'registration'],
    });
  }

  async transferBrandOwnership(updateBrandOwner:UpdateBrandOwnershipDto): Promise<string> {
    const brand = await this.identityDetailRepository.findOne({where:{identity_id:updateBrandOwner.brand_identity_id}});
if (!brand) throw new NotFoundException('Brand is not found')
    const newOwnerDetails = await this.identityDetailRepository.findOne({
      where: { identity_id: updateBrandOwner.new_owner_identity_id },
    });
    if (!newOwnerDetails) throw new NotFoundException('New owner not found');
    brand.registration_id = newOwnerDetails.registration_id;
    brand.identity_id = newOwnerDetails.identity_id
    await this.brandDetailRepository.save(brand);
    return `Ownership of brand ID "${updateBrandOwner.brand_identity_id}" has been successfully transferred to "${updateBrandOwner.new_owner_identity_id}".`;
  }



async removeBrandDetail(id: string): Promise<void> {
    const brandDetail = await this.findOneBrandDetail(id);
    await this.brandDetailRepository.remove(brandDetail);
  }

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
