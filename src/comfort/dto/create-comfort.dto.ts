import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComfortDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
