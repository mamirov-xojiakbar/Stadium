import { PartialType } from '@nestjs/swagger';
import { CreateComfortDto } from './create-comfort.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateComfortDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
