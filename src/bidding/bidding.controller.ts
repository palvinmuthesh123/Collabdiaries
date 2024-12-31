import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BidService } from './bidding.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid, DealType } from './entity/bid.entity';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { UpdateNegotiationDto } from './dto/update-negotiation.dto';
import { Negotiation } from './entity/bid-negotiation.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BidStatus } from 'src/common/enum';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createBid')
  async createBid(@Body() createBidDto: CreateBidDto): Promise<any> {
    await this.bidService.createBid(createBidDto);
    return { message: 'Bid is being processed' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAllBid(): Promise<Bid[]> {
    return this.bidService.findAllBid();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/filter')
  async findAllBidByFilter(
    @Body('statuses') statuses?: BidStatus[],
    @Body('dealTypes') dealTypes?: DealType[],
  ): Promise<Bid[]> {
    return this.bidService.findAllBidByFilter(statuses, dealTypes);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneBid(@Param('id') id: string): Promise<Bid> {
    return this.bidService.findOneBid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userBids/:id')
  async findUserBid(@Param('id') id: string): Promise<Bid[]> {
    return this.bidService.findUserBid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBid(
    @Param('id') id: string,
    @Body() updateBidDto: UpdateBidDto,
  ): Promise<Bid> {
    return this.bidService.updateBid(id, updateBidDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeBid(@Param('id') id: string): Promise<void> {
    return this.bidService.removeBid(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('negotiation')
  async createNegotiation(
    @Body() createNegotiationDto: CreateNegotiationDto,
  ): Promise<Negotiation> {
    return this.bidService.createNegotiation(createNegotiationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nego')
  async findAllNegotiation(): Promise<Negotiation[]> {
    return this.bidService.findAllNegotiation();
  }

  @UseGuards(JwtAuthGuard)
  @Get('negotiation/:id')
  async findOneNegotiation(@Param('id') id: string): Promise<Negotiation> {
    return this.bidService.findOneNegotiation(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userNegotiation/:bid_id')
  async findUserNegotiation(
    @Param('bid_id') bid_id: string, 
    @Query('negoByUserId') negoByUserId: string, 
    @Query('negoToUserId') negoToUserId: string): Promise<Negotiation[]> {
    return this.bidService.findUserNegotiation(bid_id, negoByUserId, negoToUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('negotiation/:id')
  async updateNegotiation(
    @Param('id') id: string,
    @Body() updateNegotiationDto: UpdateNegotiationDto,
  ): Promise<Negotiation> {
    return this.bidService.updateNegotiation(id, updateNegotiationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('negotiation/:id')
  async removeNegotiation(@Param('id') id: string): Promise<void> {
    return this.bidService.removeNegotiation(id);
  }
}
