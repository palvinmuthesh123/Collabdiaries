import {InjectRepository} from "@nestjs/typeorm";
import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {Repository} from "typeorm";
import {IdentityBlock} from "./entities/user-block-setting.entity";
import {CreateBlockIdentityDto} from "./dto/create-block-identity.dto";
import {CreateReportDetailsDto} from "./dto/create-report.dto";
import {ReportDetails} from "./entities/report-setting.entity";
import {UpdateReportDetailsDto} from "./dto/update-report.dto";
import {IdentityDetail} from "../users/entity/identity-detail.entity";
import {UserType} from "../common/enum";

@Injectable()
export class SettingService {
  constructor(
      @InjectRepository(IdentityBlock)
      private readonly identityBlockRepository: Repository<IdentityBlock>,
      @InjectRepository(IdentityDetail)
      private readonly identityDetailsRepository: Repository<IdentityDetail>,
      @InjectRepository(ReportDetails)
      private readonly reportDetailsRepository: Repository<ReportDetails>,
  ) {}

  // Helper method to create a block
  private async createBlock(createBlockIdentity:CreateBlockIdentityDto): Promise<void> {
    const block = this.identityBlockRepository.create({
      blocker_id: createBlockIdentity.blocker_id,
      blocked_id: createBlockIdentity.blocked_id,
    });
    await this.identityBlockRepository.save(block);
  }


  // Method to block a user
  async blockUser(data:CreateBlockIdentityDto): Promise<void> {
    const blocker =  await this.identityDetailsRepository.findOne({where:{identity_id:data.blocker_id }});
    if (!blocker) throw new BadRequestException("Blocker is not have any identity");
    // Check if the block already exists
    const existingBlock = await this.identityBlockRepository.findOne({
      where: { blocker_id: data.blocker_id, blocked_id: data.blocked_id },
    });
    if (existingBlock) throw new BadRequestException('User is already blocked');

    // Fetch the identity details of the user being blocked
    const identityDetails = await this.identityDetailsRepository.findOne({
      where: { identity_id: data.blocked_id },
    });
    if (!identityDetails) throw new BadRequestException('Blocked user does not have any identity');

    // Prevent self-blocking
    if (data.blocker_id === data.blocked_id) {
      throw new BadRequestException('You cannot block yourself');
    }

    // Handle blocking logic for CollabUser
    if (identityDetails.user_type === UserType.CollabUser) {
      const allBrandIdentities = await this.identityDetailsRepository.find({
        where: { registration_id: identityDetails.registration_id },
      });
      // Block all associated brand identities
      for (const identityDetail of allBrandIdentities) {
        await this.createBlock({blocker_id:data.blocker_id, blocked_id:identityDetail.identity_id});
      }
    }
    // Block the main identity
    await this.createBlock({blocker_id:data.blocker_id, blocked_id:data.blocked_id});
  }

  // Method to unblock a user
  async unblockUser(blockerId: string, blockedId: string): Promise<void> {
    const block = await this.identityBlockRepository.findOne({
      where: { blocker_id: blockerId, blocked_id: blockedId },
    });
    if (!block) throw new BadRequestException('User is not blocked');
    await this.identityBlockRepository.remove(block);
  }

  // Fetch all blocked users for a given blocker
  async getBlockedUsers(blockerId: string): Promise<IdentityBlock[]> {
    return this.identityBlockRepository.find({
      where: { blocker_id: blockerId },
      relations: ['blocked'],
    });
  }

  // Report logic ====================================================

  async create(createDto: CreateReportDetailsDto): Promise<ReportDetails> {
    const report = this.reportDetailsRepository.create(createDto);
    return this.reportDetailsRepository.save(report);
  }

  async findAll(): Promise<ReportDetails[]> {
    return this.reportDetailsRepository.find();
  }

  async findOne(id: string): Promise<ReportDetails> {
    const report = await this.reportDetailsRepository.findOne({
      where: { report_id: id },
      relations: ['reporter', 'reported'],
    });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async updateReportStatus(id: string, updateDto: UpdateReportDetailsDto): Promise<ReportDetails> {
    const report = await this.reportDetailsRepository.findOne({where:{report_id:id}})
    Object.assign(report, updateDto);
    return this.reportDetailsRepository.save(report);
  }

  async remove(id: string): Promise<void> {
    const report = await this.findOne(id);
    await this.reportDetailsRepository.remove(report);
  }
}
