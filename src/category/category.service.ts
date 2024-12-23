import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Create a new category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Get a category by ID
  async findOne(category_id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${category_id} not found`);
    }
    return category;
  }

  // Update an existing category
  async update(
    category_id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(category_id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Delete a category
  async remove(category_id: string): Promise<void> {
    const category = await this.findOne(category_id);
    await this.categoryRepository.remove(category);
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
