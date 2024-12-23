import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDetailDto } from './dto/create-brand-detail.dto';
import { UpdateBrandDetailDto } from './dto/update-brand-detail.dto';
import { CreateIdentityDetailDto } from './dto/create-identity-detail.dto';
import { UpdateIdentityDetailDto } from './dto/update-identity-detail.dto';
import { CreateIdentityLocationDto } from './dto/create-identity-location.dto';
import { UpdateIdentityLocationDto } from './dto/update-identity-location.dto';
import { CreateUserCoverPhotoDto } from './dto/create-user-coverphoto.dto';
import { UpdateUserCoverPhotoDto } from './dto/update-user-coverphoto.dto';
import { CreateRegistrationsDto } from './dto/create-registration.dto';
import { UpdateRegistrationsDto } from './dto/update-registration.dto';
import { BrandDetail } from './entity/brand-detail.entity';
import { IdentityDetail } from './entity/identity-detail.entity';
import { IdentityLocation } from './entity/identity-location.entity';
import { Registration } from './entity/registration.entity';
import { UserCoverPhoto } from './entity/user-coverphoto.entity';

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

  async findAllRegistration(): Promise<Registration[]> {
    return this.registrationRepository.find();
  }

  async findOneRegistration(id: string): Promise<Registration> {
    return this.registrationRepository.findOneBy({ registration_id: id });
  }

  async updateRegistration(
    id: string,
    updateRegistrationDto: UpdateRegistrationsDto,
  ): Promise<Registration> {
    const user = await this.registrationRepository.findOneBy({ registration_id: id });
    if(!user) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    await this.registrationRepository.update(id, updateRegistrationDto);
    return this.findOneRegistration(id);
  }

  async removeRegistration(id: string): Promise<void> {
    await this.registrationRepository.delete(id);
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

  async findOneIdentityDetail(id: string): Promise<IdentityDetail> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
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
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
    }); // Check if it exists

    Object.assign(identityDetail, updateIdentityDetailDto);
    return this.identityDetailRepository.save(identityDetail);
  }

  async removeIdentityDetail(id: string): Promise<void> {
    const identityDetail = await this.identityDetailRepository.findOne({
      where: { identity_id: id },
    }); // Check if it exists
    await this.identityDetailRepository.remove(identityDetail);
  }

  async findAllIdentityDetail(id: string): Promise<IdentityDetail[]> {
    return this.identityDetailRepository.find({
      where: { registration_id: id },
    });
  }

  async createBrandDetail(
    createBrandDetailDto: CreateBrandDetailDto,
  ): Promise<BrandDetail> {
    const newBrandDetail =
      this.brandDetailRepository.create(createBrandDetailDto);
    return this.brandDetailRepository.save(newBrandDetail);
  }

  async findAllBrandDetail(): Promise<BrandDetail[]> {
    return this.brandDetailRepository.find({
      relations: ['identityDetail', 'registration', 'category'],
    });
  }

  async findOneBrandDetail(id: string): Promise<BrandDetail> {
    const brandDetail = await this.brandDetailRepository.findOne({
      where: { brand_id: id },
      relations: ['identityDetail', 'registration', 'category'],
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
      relations: ['identityDetail', 'registration', 'category'],
    });
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
