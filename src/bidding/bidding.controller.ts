import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BidService } from './bidding.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid } from './entity/bid.entity';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';
import { Negotiation } from './entity/bid-negotiation.entity';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  //Bid
  // @Post('/createBid')
  // async createBid(@Body() createBidDto: CreateBidDto): Promise<Bid> {
  //   return this.bidService.createBid(createBidDto);
  // }
  @Post('/createBid')
  async createBid(@Body() createBidDto: CreateBidDto): Promise<any> {
    await this.bidService.createBid(createBidDto);
    return { message: 'Bid is being processed' };
  }

  @Get('/')
  async findAllBid(): Promise<Bid[]> {
    return this.bidService.findAllBid();
  }

  @Get(':id')
  async findOneBid(@Param('id') id: string): Promise<Bid> {
    return this.bidService.findOneBid(id);
  }

  @Get('userBids/:id')
  async findUserBid(@Param('id') id: string): Promise<Bid[]> {
    return this.bidService.findUserBid(id);
  }

  @Put(':id')
  async updateBid(
    @Param('id') id: string,
    @Body() updateBidDto: UpdateBidDto,
  ): Promise<Bid> {
    return this.bidService.updateBid(id, updateBidDto);
  }

  @Delete(':id')
  async removeBid(@Param('id') id: string): Promise<void> {
    return this.bidService.removeBid(id);
  }

  //Negotiation
  @Post('negotiation')
  async createNegotiation(
    @Body() createNegotiationDto: CreateNegotiationDto,
  ): Promise<Negotiation> {
    return this.bidService.createNegotiation(createNegotiationDto);
  }

  @Get('nego')
  async findAllNegotiation(): Promise<Negotiation[]> {
    return this.bidService.findAllNegotiation();
  }

  @Get('negotiation/:id')
  async findOneNegotiation(@Param('id') id: string): Promise<Negotiation> {
    return this.bidService.findOneNegotiation(id);
  }

  @Get('userNegotiation/:bid_id')
  async findUserNegotiation(
    @Param('bid_id') bid_id: string, 
    @Query('negoByUserId') negoByUserId: string, 
    @Query('negoToUserId') negoToUserId: string): Promise<Negotiation[]> {
    return this.bidService.findUserNegotiation(bid_id, negoByUserId, negoToUserId);
  }

  @Put('negotiation/:id')
  async updateNegotiation(
    @Param('id') id: string,
    @Body() updateNegotiationDto: UpdateNegotiationDto,
  ): Promise<Negotiation> {
    return this.bidService.updateNegotiation(id, updateNegotiationDto);
  }

  @Delete('negotiation/:id')
  async removeNegotiation(@Param('id') id: string): Promise<void> {
    return this.bidService.removeNegotiation(id);
  }
}
