import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perks } from './perks.entity';
import { CreatePerksDto } from './dto/create-perks.dto';
import { UpdatePerksDto } from './dto/update-perks.dto';

@Injectable()
export class PerksService {
  constructor(
    @InjectRepository(Perks)
    private perksRepository: Repository<Perks>,
  ) {}

  async create(createPerksDto: CreatePerksDto): Promise<Perks> {
    const perks = this.perksRepository.create(createPerksDto);
    return this.perksRepository.save(perks);
  }

  async findAll(): Promise<Perks[]> {
    return this.perksRepository.find();
  }

  async findOne(id: string): Promise<Perks> {
    const perks = await this.perksRepository.findOneBy({ perks_id: id });
    if (!perks) {
      throw new NotFoundException(`Perks with ID ${id} not found`);
    }
    return perks;
  }

  async update(id: string, updatePerksDto: UpdatePerksDto): Promise<Perks> {
    const perks = await this.findOne(id);
    Object.assign(perks, updatePerksDto);
    return this.perksRepository.save(perks);
  }

  async remove(id: string): Promise<void> {
    const perks = await this.findOne(id);
    await this.perksRepository.remove(perks);
  }
}
