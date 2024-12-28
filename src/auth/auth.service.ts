import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {FirebaseService} from './firebase.service';
import {Registration} from '../users/entity/registration.entity';
import {IdentityDetail} from '../users/entity/identity-detail.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {NotificationSetting} from "../notification/entities/notification-setting.entity";
import {ReferralDetails} from "../referral/entities/referral.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(IdentityDetail)
    private readonly identityDetailRepository: Repository<IdentityDetail>,
    @InjectRepository(NotificationSetting)
    private readonly notificationSettingRepository: Repository<NotificationSetting>,
    @InjectRepository(ReferralDetails)
    private readonly referralDetailsRepository: Repository<ReferralDetails>,
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async generateReferralCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6
    let referralString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralString += characters[randomIndex];
    }
    const referralCode = await this.referralDetailsRepository.findOne({where:{referral_code:referralString}})
    if (!referralCode) return referralString;
    await this.generateReferralCode()
  }

  async login_firebase(idToken: string, mobile_no: string,referral_code?:string) {
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
          referral_code:referral_code || null
        });
        await this.identityDetailRepository.save(createIdentityDetail);

        // Create referral code each and every identity
        const referralDetail = this.referralDetailsRepository.create({
          identity_id: createIdentityDetail.identity_id,
          referral_code: await this.generateReferralCode()
        });
        await this.referralDetailsRepository.save(referralDetail);

        // Create notification setting of every identity
        const createIdentityNotificationSetting =  this.notificationSettingRepository.create({
          identity_id:createIdentityDetail.identity_id
        })
        await this.notificationSettingRepository.save(createIdentityNotificationSetting);
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
  async login_test(mobile_no: string,referral_code?:string) {
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
        referral_code:referral_code,
      });
      await this.identityDetailRepository.save(createIdentityDetail);

      // Create referral code each and every identity
      const referralDetail = this.referralDetailsRepository.create({
        identity_id: createIdentityDetail.identity_id,

      });
      await this.referralDetailsRepository.save(referralDetail);

      // Create notification setting of every identity
      const createIdentityNotificationSetting =  this.notificationSettingRepository.create({
        identity_id:createIdentityDetail.identity_id
      })
      await this.notificationSettingRepository.save(createIdentityNotificationSetting);
    }

    const jwtToken = this.jwtService.sign({
      registration_id: user.registration_id,
      mobile_no: user.mobile_no,
    });
    return { ...user, accessToken: jwtToken };
  }

}
