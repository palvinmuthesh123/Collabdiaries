import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const newCity = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(newCity);
  }

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { city_id: id } });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    await this.findOne(id); // Check if the city exists
    await this.cityRepository.update(id, updateCityDto);
    return this.cityRepository.findOne({ where: { city_id: id } });
  }

  async remove(id: number): Promise<void> {
    const city = await this.findOne(id);
    await this.cityRepository.remove(city);
  }
}
