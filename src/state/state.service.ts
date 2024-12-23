import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    const newState = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(newState);
  }

  async findAll(): Promise<State[]> {
    return this.stateRepository.find({ relations: ['country', 'city'] }); // Include related entities
  }

  async findOne(id: number): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { state_id: id },
      relations: ['country', 'city'],
    });
    if (!state) {
      throw new NotFoundException('State not found');
    }
    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    await this.findOne(id); // Check if the state exists
    await this.stateRepository.update(id, updateStateDto);
    return this.stateRepository.findOne({
      where: { state_id: id },
      relations: ['country', 'city'],
    });
  }

  async remove(id: number): Promise<void> {
    const state = await this.findOne(id);
    await this.stateRepository.remove(state);
  }
}
