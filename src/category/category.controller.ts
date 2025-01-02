import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Category} from './category.entity';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Creating category' })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'Fetching all categories' })
  async findAll(@Body('name') name?:string): Promise<Category[]> {
    return this.categoryService.findAll(name);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Fetching single category' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update:id')
  @ApiOperation({ summary: 'Updating category' })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('delete:id')
  @ApiOperation({ summary: 'Deleting category' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
