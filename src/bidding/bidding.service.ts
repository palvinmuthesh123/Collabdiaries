import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { JobQueueService } from './job-queue.service';
import { Bid } from './entity/bid.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Negotiation } from './entity/bid-negotiation.entity';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
    @InjectRepository(Negotiation)
    private readonly negotiationRepository: Repository<Negotiation>,
    private readonly jobQueueService: JobQueueService
  ) {}

  //Bid
  async createBid(createBidDto: CreateBidDto): Promise<void> {
    // const bid = this.bidRepository.create(createBidDto);
    // return await this.bidRepository.save(bid);
    // await this.bidQueue.add(createBidDto, {
    //   attempts: 3, // Retry up to 3 times on failure
    //   backoff: 5000, // Wait 5 seconds between retries
    // });
    this.jobQueueService.addJob(createBidDto);
  }

  async findAllBid(): Promise<Bid[]> {
    return await this.bidRepository.find();
  }

  async findOneBid(bid_id: string): Promise<Bid> {
    const bid = await this.bidRepository.findOne({ where: { bid_id } });
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${bid_id} not found`);
    }
    return bid;
  }

  async findUserBid(bidByUserId: string): Promise<Bid[]> {
    const bid = await this.bidRepository.find({
      where: { bidByUserId },
      relations: ['negotiation', 'identityDetail', 'identityDetail1'],
    });
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${bidByUserId} not found`);
    }
    return bid;
  }

  async updateBid(bid_id: string, updateBidDto: UpdateBidDto): Promise<Bid> {
    await this.findOneBid(bid_id); // Check if the bid exists
    await this.bidRepository.update(bid_id, updateBidDto);
    return this.findOneBid(bid_id); // Return the updated bid
  }

  async removeBid(bid_id: string): Promise<void> {
    const result = await this.bidRepository.delete(bid_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bid with ID ${bid_id} not found`);
    }
  }

  //Negotiation
  async createNegotiation(
    createNegotiationDto: CreateNegotiationDto,
  ): Promise<Negotiation> {
    const negotiation = this.negotiationRepository.create(createNegotiationDto);
    return await this.negotiationRepository.save(negotiation);
  }

  async findAllNegotiation(): Promise<Negotiation[]> {
    return await this.negotiationRepository.find({ relations: ['bid'], where: { bid: Not(IsNull()) }, });
    // const results =  await this.negotiationRepository.find({});
    // console.log("RRRRRRRRRRRRRRRRRR")
    // return {}
  }

  async findOneNegotiation(negotiation_id: string): Promise<Negotiation> {
    const negotiation = await this.negotiationRepository.findOne({
      where: { negotiation_id },
      relations: ['bid'],
    });
    if (!negotiation) {
      throw new NotFoundException(
        `Negotiation with ID ${negotiation_id} not found`,
      );
    }
    return negotiation;
  }

  async findUserNegotiation(bid_id: string, negoByUserId: string, negoToUserId: string): Promise<Negotiation[]> {
    console.log(bid_id, negoByUserId, negoToUserId, "PPPPPPPPPPP")
    const negotiation = await this.negotiationRepository.find({
      where: {
        bid_id,
        negoByUserId,
        negoToUserId,
      },
      order: {
        created_date: 'DESC',
      },
      // relations: ['bid'],
    });
    console.log(negotiation, "NNNNNNNNNNNNNNN")
    if (!negotiation) {
      throw new NotFoundException(
        `Negotiation with Bid ID ${bid_id}, negoByUserId ${negoByUserId}, negoToUserId ${negoToUserId} not found`,
      );
    }
    return negotiation;
  }

  async updateNegotiation(
    negotiation_id: string,
    updateNegotiationDto: UpdateNegotiationDto,
  ): Promise<Negotiation> {
    await this.findOneNegotiation(negotiation_id); // Check if the negotiation exists
    await this.negotiationRepository.update(
      negotiation_id,
      updateNegotiationDto,
    );
    return this.findOneNegotiation(negotiation_id); // Return the updated negotiation
  }

  async removeNegotiation(negotiation_id: string): Promise<void> {
    const result = await this.negotiationRepository.delete(negotiation_id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Negotiation with ID ${negotiation_id} not found`,
      );
    }
  }
}