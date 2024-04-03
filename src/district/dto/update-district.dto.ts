import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  regionId?: number;
}
