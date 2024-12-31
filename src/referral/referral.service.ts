import {Injectable} from '@nestjs/common';
// import {CreateReferralDto} from './dto/create-referral.dto';
// import {InjectRepository} from "@nestjs/typeorm";
// import {Not, Repository} from "typeorm";
// import * as QRCode from 'qrcode';
// import {IdentityDetail, UserType} from "../users/entity/identity-detail.entity";
// import {ReferralDetails} from "./entities/referral.entity";

@Injectable()
export class ReferralService {

  constructor(
      // @InjectRepository(ReferralDetails)
      // private readonly referralRepository: Repository<ReferralDetails>,
      // @InjectRepository(IdentityDetail)
      // private readonly identityRepository: Repository<IdentityDetail>,
  ) {}

//   async generateReferralCode(): Promise<string> {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const length = 6
//     let referralString = '';
//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * characters.length);
//       referralString += characters[randomIndex];
//     }
//     const referralCode = await this.referralRepository.findOne({where:{referral_code:referralString}})
//     if (!referralCode) return referralString;
//      await this.generateReferralCode()
//   }
//
//   async generateQrCode(url:string):Promise<string>{
//     const qrCode = await QRCode.toDataURL(url);
//     if (qrCode) return qrCode
//     throw new NotFoundException('QR Code link is not generated');
//   }
//
//   async create(createReferralDto: CreateReferralDto) {
//     const identity = await this.identityRepository.findOne({where:{identity_id:createReferralDto.identity_id}})
//     if (!identity) throw new NotFoundException('This identity does not exist')
//     if (identity.user_type === UserType.CollabUser){
//       const userHomePageUrl = createReferralDto.url || '';
//       const qrCodeLink = await this.generateQrCode(userHomePageUrl)
//       const uniqueReferralCode = await this.generateReferralCode();
//       const referral = this.referralRepository.create({
//         ...createReferralDto,
//         referral_code: uniqueReferralCode,
//         qr_code_link: qrCodeLink,
//       });
//       return  this.referralRepository.save(referral);
//     }
//     const brandHomePageUrl = createReferralDto.url || ''
//     const qrCodeLink = await this.generateQrCode(brandHomePageUrl)
//     const referral = this.referralRepository.create({
//       ...createReferralDto,
//       referral_code: null,
//       qr_code_link: qrCodeLink,
//     });
//     return  this.referralRepository.save(referral);
//   }
//
//   findAll():Promise<ReferralDetails[]> {
//     return this.referralRepository.find()
//   }
//
//   async findOne(id: string):Promise<ReferralDetails> {
//     const referral =await this.referralRepository.findOne({where:{referral_id:id}});
//     if (!referral) throw new NotFoundException('Referral not found')
//     return  referral
//   }
//
//   async updateQrCode(data:{identity_id:string,url:string}){
//     const referralDetails = await this.referralRepository.findOne({where:{identity_id:data.identity_id}});
//     if (!referralDetails)throw new NotFoundException('Referral not found')
//     referralDetails.qr_code_link =  await this.generateQrCode(data.url)
//     await this.referralRepository.save(referralDetails)
//   }
// // This work do with the cron_job
//   async update():Promise<void> {
//     const referrals = await this.referralRepository.find({where:{ referral_code: Not(null),}});
//     for (const referral of referrals) {
//       const brandCount = await this.identityRepository.count({where:{referral_code:referral.referral_code,user_type:UserType.Brand}})
//       const userCount = await this.identityRepository.count({where:{referral_code:referral.referral_code,user_type:UserType.CollabUser}})
//       const referralDetails = await this.referralRepository.findOne({
//         where: { referral_code: referral.referral_code },
//       });
//       referralDetails.total_brand = brandCount;
//       referralDetails.total_register = userCount;
//        await this.referralRepository.save(referralDetails);
//     }
//   }
//
//   async remove(id: string):Promise<void> {
//     const referral = await this.referralRepository.findOne({where:{referral_id:id}});
//    await this.referralRepository.remove(referral);
//   }
}
