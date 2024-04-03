import { IsInt, IsString, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class CreateMediaDto {
  @IsInt()
  @IsNotEmpty()
  stadiumId: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
