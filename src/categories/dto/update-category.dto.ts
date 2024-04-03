import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  parentId?: number;
}
