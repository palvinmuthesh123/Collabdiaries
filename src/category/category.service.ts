import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ILike, Repository} from 'typeorm';
import {Category} from './category.entity';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const getCategory = await this.categoryRepository.findOne({where:{name:createCategoryDto.name}})
    if (getCategory) throw new BadRequestException('this name category is already created')
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(name?: string): Promise<Category[]> {
    if (name) {
      return this.categoryRepository.find({
        where: { name: ILike(`%${name}%`) },
      });
    }
    return this.categoryRepository.find();
  }

  // findAll(name:string){
  //   return this.categoryRepository.find()
  // }

  async findOne(category_id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${category_id} not found`);
    }
    return category;
  }

  async update(
    category_id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(category_id);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(category_id: string): Promise<void> {
    const category = await this.findOne(category_id);
    await this.categoryRepository.remove(category);
  }

}
