import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create a new category
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Creating category' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  // Get a category by ID
  @UseGuards(JwtAuthGuard)
  @Get(':category_id')
  @ApiOperation({ summary: 'Fetching single category' })
  async findOne(@Param('category_id') category_id: string): Promise<Category> {
    return this.categoryService.findOne(category_id);
  }

  // Update an existing category
  @UseGuards(JwtAuthGuard)
  @Put(':category_id')
  @ApiOperation({ summary: 'Updating category' })
  async update(
    @Param('category_id') category_id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(category_id, updateCategoryDto);
  }

  // Delete a category
  @UseGuards(JwtAuthGuard)
  @Delete(':category_id')
  @ApiOperation({ summary: 'Deleting category' })
  async remove(@Param('category_id') category_id: string): Promise<void> {
    return this.categoryService.remove(category_id);
  }

  // Get all categories
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Fetching all categories' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
