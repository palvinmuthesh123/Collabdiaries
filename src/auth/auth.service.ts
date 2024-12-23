import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from './firebase.service';
import { Registration } from '../users/entity/registration.entity';
import { IdentityDetail } from '../users/entity/identity-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(IdentityDetail)
    private readonly identityDetailRepository: Repository<IdentityDetail>,
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async login_firebase(idToken: string, mobile_no: string) {
    const decodedToken = await this.firebaseService.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    if (userId) {
      // Check if the user exists in your database
      let user = await this.registrationRepository.findOneBy({
        mobile_no: mobile_no,
      });

      if (!user) {
        // Create user logic here
        const registration = this.registrationRepository.create({
          mobile_no: mobile_no,
        });
        user = await this.registrationRepository.save(registration);

        const createIdentityDetail = this.identityDetailRepository.create({
          registration_id: user.registration_id,
        });
        await this.identityDetailRepository.save(createIdentityDetail);
      }

      const jwtToken = this.jwtService.sign({
        registration_id: user.registration_id,
        mobile_no: user.mobile_no,
      });
      return { ...user, accessToken: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid Id token');
    }
  }

  //***For Testing Purpose
  async login_test(mobile_no: string) {
    if (!mobile_no || mobile_no.length < 10) {
      throw new UnauthorizedException('Invalid Mobile Number');
    }

    let user = await this.registrationRepository.findOneBy({
      mobile_no: mobile_no,
    });

    if (!user) {
      // Create user logic here
      const registration = this.registrationRepository.create({
        mobile_no: mobile_no,
      });
      user = await this.registrationRepository.save(registration);

      const createIdentityDetail = this.identityDetailRepository.create({
        registration_id: user.registration_id,
      });
      await this.identityDetailRepository.save(createIdentityDetail);
    }

    const jwtToken = this.jwtService.sign({
      registration_id: user.registration_id,
      mobile_no: user.mobile_no,
    });
    return { ...user, accessToken: jwtToken };
  }

}
