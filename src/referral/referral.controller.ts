import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ReferralService} from './referral.service';
import {CreateReferralDto} from './dto/create-referral.dto';
import {ReferralDetails} from "./entities/referral.entity";

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  create(@Body() createReferralDto: CreateReferralDto):Promise<ReferralDetails> {
    return this.referralService.create(createReferralDto);
  }

  @Get()
  findAll():Promise<ReferralDetails[]> {
    return this.referralService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateReferralDto: UpdateReferralDto) {
  //   return this.referralService.update(id, updateReferralDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referralService.remove(id);
  }
}
