import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {

  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNumber()
  regionId: number;
}
