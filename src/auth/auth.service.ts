import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {FirebaseService} from './firebase.service';
import {Registration} from '../users/entity/registration.entity';
import {IdentityDetail} from '../users/entity/identity-detail.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {NotificationSetting} from "../notification/entities/notification-setting.entity";
import {DealType} from "../common/enum";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(IdentityDetail)
    private readonly identityDetailRepository: Repository<IdentityDetail>,
    @InjectRepository(NotificationSetting)
    private readonly notificationSettingRepository: Repository<NotificationSetting>,
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
    const referralCode = await this.registrationRepository.findOne({where:{referral_code:referralString}})
    if (!referralCode) return referralString;
    await this.generateReferralCode()
  }

  async login_firebase(idToken: string, mobile_no: string, referral_code?: string) {
    if (!mobile_no || mobile_no.length < 10) {
      throw new UnauthorizedException('Invalid Mobile Number');
    }
    const identities = [];
    const decodedToken = await this.firebaseService.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    if (userId) {
      let user = await this.registrationRepository.findOneBy({
        mobile_no: mobile_no,
      });
      if (!user) {
        const registration = this.registrationRepository.create({
          mobile_no: mobile_no,
          referral_code: await this.generateReferralCode(),
        });
        user = await this.registrationRepository.save(registration);
        const createIdentityDetail = this.identityDetailRepository.create({
          registration_id: user.registration_id,
          referral_by_code: referral_code || null,
          deal_type: [DealType.Barter, DealType.Paid, DealType.Unpaid],
        });
        const newIdentity = await this.identityDetailRepository.save(createIdentityDetail);
        const createIdentityNotificationSetting = this.notificationSettingRepository.create({
          identity_id: newIdentity.identity_id,
        });
        await this.notificationSettingRepository.save(createIdentityNotificationSetting);
        identities.push({
          identity_id: newIdentity.identity_id,
          user_type: newIdentity.user_type,
        });
      } else {
        // Fetch identities for the existing user
        const identityDetails = await this.identityDetailRepository.find({
          where: { registration_id: user.registration_id },
        });
        identityDetails.map((identity) => {
          identities.push({
            identity_id: identity.identity_id,
            user_type: identity.user_type,
          });
        });
      }
      // Generate JWT token
      const jwtToken = this.jwtService.sign({
        registration_id: user.registration_id,
        mobile_no: user.mobile_no,
      });
      return { ...user, identities, accessToken: jwtToken };
    } else {
      throw new UnauthorizedException('Invalid Id token');
    }
  }

  //***For Testing Purpose
  async login_test(mobile_no: string, referral_code?: string) {
    if (!mobile_no || mobile_no.length < 10) {
      throw new UnauthorizedException('Invalid Mobile Number');
    }
    const identities = [];
    let user = await this.registrationRepository.findOneBy({
      mobile_no: mobile_no,
    });
    if (!user) {
      const registration = this.registrationRepository.create({
        mobile_no: mobile_no,
        referral_code: await this.generateReferralCode(),
      });
      user = await this.registrationRepository.save(registration);

      const createIdentityDetail = this.identityDetailRepository.create({
        registration_id: user.registration_id,
        referral_by_code: referral_code,
        deal_type: [DealType.Barter, DealType.Paid, DealType.Unpaid],
      });
      const newIdentity = await this.identityDetailRepository.save(createIdentityDetail);

      // Create notification setting for the new identity
      const createIdentityNotificationSetting = this.notificationSettingRepository.create({
        identity_id: newIdentity.identity_id,
      });
      await this.notificationSettingRepository.save(createIdentityNotificationSetting);

      // Add the newly created identity to the identities list
      identities.push({
        identity_id: newIdentity.identity_id,
        user_type: newIdentity.user_type,
      });
    } else {
      // Fetch identities for the existing user
      const identityDetails = await this.identityDetailRepository.find({
        where: { registration_id: user.registration_id },
      });

      identityDetails.map((identity) => {
        identities.push({
          identity_id: identity.identity_id,
          user_type: identity.user_type,
        });
      });
    }
    const accessToken = this.jwtService.sign({
      registration_id: user.registration_id,
      mobile_no: user.mobile_no,
    });
    return { ...user, identities, accessToken };
  }

}
