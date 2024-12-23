import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const newCountry = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(newCountry);
  }

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { country_id: id },
    });
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    await this.findOne(id); // Check if the country exists
    await this.countryRepository.update(id, updateCountryDto);
    return this.countryRepository.findOne({ where: { country_id: id } });
  }

  async remove(id: number): Promise<void> {
    const country = await this.findOne(id);
    await this.countryRepository.remove(country);
  }
}
