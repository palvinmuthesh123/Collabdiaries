import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import {PerksService} from './perks.service';
import {CreatePerksDto} from './dto/create-perks.dto';
import {UpdatePerksDto} from './dto/update-perks.dto';
import {Perks} from './perks.entity';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('perk')
@Controller('perk')
export class PerksController {
  constructor(private readonly perksService: PerksService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Creating perks' })
  create(@Body() createPerksDto: CreatePerksDto): Promise<Perks> {
    return this.perksService.create(createPerksDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'Fetching all perks' })
  findAll(): Promise<Perks[]> {
    return this.perksService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Getting single perk detail by id' })
  findOne(@Param('id') id: string): Promise<Perks> {
    return this.perksService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @ApiOperation({ summary: 'Updating perk' })
  update(
    @Param('id') id: string,
    @Body() updatePerksDto: UpdatePerksDto,
  ): Promise<Perks> {
    return this.perksService.update(id, updatePerksDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('delete:id')
  @ApiOperation({ summary: 'Delete perk' })
  remove(@Param('id') id: string): Promise<void> {
    return this.perksService.remove(id);
  }
}
