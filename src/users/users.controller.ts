import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './model/user.model';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { UserGuard } from '../guards/user.guard';
import { FindUserDto } from './dto/find-user.dto';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verify-ot.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'registr user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  regstration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photo: string,
  ): Promise<User> {
    return this.usersService.create(createUserDto, photo);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @UseGuards(UserGuard)
  @HttpCode(200)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  @HttpCode(200)
  @Post('find')
  findUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }

  @HttpCode(200)
  @Post('newotp')
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(200)
  @Post('verifyotp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto);
  }
}
