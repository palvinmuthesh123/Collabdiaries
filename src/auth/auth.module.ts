import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseService } from './firebase.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../users/entity/registration.entity';
import { IdentityDetail } from '../users/entity/identity-detail.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationSetting } from '../notification/entities/notification-setting.entity';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Registration,
      IdentityDetail,
      NotificationSetting,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // TODO => TOKEN EXPIRE TIME SET AGAIN
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, FirebaseService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
