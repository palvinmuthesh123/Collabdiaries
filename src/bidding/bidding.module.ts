import { Module } from '@nestjs/common';
// import { BullModule } from '@nestjs/bull';
import { BidService } from './bidding.service';
// import { BidProcessor } from './bidding.processor';
import { BidController } from './bidding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entity/bid.entity';
import { Negotiation } from './entity/bid-negotiation.entity';
import { JobQueueService } from './job-queue.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid, Negotiation]),
    UsersModule
    // BullModule.registerQueue({
    //   name: 'bidQueue',
    // }),
  ],
  providers: [BidService, JobQueueService],
  controllers: [BidController],
  exports: [BidService],
})
export class BiddingModule {}
