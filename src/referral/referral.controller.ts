import {Controller} from '@nestjs/common';
import {ReferralService} from './referral.service';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Creating referral' })
  // @Post()
  // create(@Body() createReferralDto: CreateReferralDto):Promise<ReferralDetails> {
  //   return this.referralService.create(createReferralDto);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Fetch list of referral' })
  // @Get()
  // findAll():Promise<ReferralDetails[]> {
  //   return this.referralService.findAll();
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Fetch single referral' })
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.referralService.findOne(id);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'manually generate qr_code brand/influencer' })
  // @Put()
  // updateQrCode(@Body() body:{identity_id:string,url:string}) {
  //   return this.referralService.updateQrCode(body);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Delete referral' })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.referralService.remove(id);
  // }
}
