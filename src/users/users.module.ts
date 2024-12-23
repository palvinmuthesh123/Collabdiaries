import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../utils/s3.service';
import { UserCoverPhoto } from './entity/user-coverphoto.entity';
import { Registration } from './entity/registration.entity';
import { IdentityLocation } from './entity/identity-location.entity';
import { IdentityDetail } from './entity/identity-detail.entity';
import { BrandDetail } from './entity/brand-detail.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Registration,
      UserCoverPhoto,
      IdentityLocation,
      IdentityDetail,
      BrandDetail,
    ]),
  ],
  providers: [UsersService, S3Service],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
