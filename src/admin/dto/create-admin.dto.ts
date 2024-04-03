import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  // @IsEmail()
  login: string;

  // @IsString()
  // @IsNotEmpty()
  tg_link: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6)
  password: string;

  // @IsString()
  // @IsNotEmpty()
  confirm_password: string;
}
