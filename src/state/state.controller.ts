import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './state.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('state')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Creating state' })
  async create(@Body() createStateDto: CreateStateDto): Promise<State> {
    return this.stateService.create(createStateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Fetching state list' })
  async findAll(): Promise<State[]> {
    return this.stateService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Fetching single state by id' })
  async findOne(@Param('id') id: number): Promise<State> {
    return this.stateService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Updating a state detail' })
  async update(
    @Param('id') id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<State> {
    return this.stateService.update(id, updateStateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete state' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.stateService.remove(id);
  }
}
