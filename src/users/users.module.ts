import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {S3Service} from '../utils/s3.service';
import {Registration} from './entity/registration.entity';
import {IdentityLocation} from './entity/location.entity';
import {IdentityDetail} from './entity/identity-detail.entity';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {Gallery} from "./entity/gallery.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Registration,
      IdentityLocation,
      IdentityDetail,
        Gallery,
    ]),
  ],
  providers: [UsersService, S3Service],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
