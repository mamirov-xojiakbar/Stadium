import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const categories = await this.categoryRepo.create(createCategoryDto);
    if (categories) {
      throw new BadRequestException('There is such a category');
    }
    return categories;
  }

  async findAllCategory() {
    return this.categoryRepo.findAll();
  }

  async findOneCategory(id: number) {
    const categories = await this.categoryRepo.findByPk(id);
    if (!categories) {
      throw new BadRequestException("There isn't such a category");
    }
    return categories;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categories = await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    if (!categories) {
      throw new BadRequestException("There isn't such a category");
    }
    return categories[1][0];
  }

  async removeCategory(id: number) {
    const categories = await this.categoryRepo.destroy({ where: { id } });
    if (!categories) {
      throw new BadRequestException("There isn't such a category");
    }
    return categories;
  }
}
