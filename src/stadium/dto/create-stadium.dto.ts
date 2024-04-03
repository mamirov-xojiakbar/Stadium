import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateStadiumDto {
  @IsInt()
  categoryId: number;

  @IsInt()
  ownerId: number;

  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  volume: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  regionId: number;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDate()
  @IsOptional()
  buildAt: string;

  @IsDate()
  @IsOptional()
  start_time: string;

  @IsDate()
  @IsOptional()
  end_time: string;
}
