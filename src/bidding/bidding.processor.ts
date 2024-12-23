import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { Bid } from './entity/bid.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Processor('bidQueue')
@Injectable()
export class BidProcessor {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  @Process()
  async handleBid(job: Job<Bid>) {
    try {
      const bid = job.data;
      await this.bidRepository.save(bid);
    } catch (error) {
      console.error('Error processing bid:', error);
    }
  }
}
