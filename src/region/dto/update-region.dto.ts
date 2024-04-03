import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
