import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsPhoneNumber('UZ') //+998901234567
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsString()
  tg_link: string;

  @IsString()
  photo: string;

  //   @IsDateString()
  //"2020.01.01"
}
