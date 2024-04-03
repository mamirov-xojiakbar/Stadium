import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;
  
  @IsOptional()
  @IsPhoneNumber('UZ') //+998901234567
  phone?: string;
  
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @IsOptional()
  @IsString()
  tg_link?: string;
}
