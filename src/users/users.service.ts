import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { FileService } from '../../file/file.service';
import { MailService } from '../mail/mail.service';
import { log } from 'console';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Op, where } from 'sequelize';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { Otp } from '../otp/models/otp.model';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { timestamp } from 'rxjs';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from './dto/verify-ot.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
    private fileUpload: FileService,
    private readonly mailService: MailService,
    private readonly botService: BotService,
  ) {}

  // token yasash funksiyasi
  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // signup va cookie ga token yozish
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('There is such a user');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: newUser.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMail(updateUser[1][0]);
    } catch (error) {
      log(error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }

    const response = {
      message: 'User registered',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async create(createUserDto: CreateUserDto, photo: string) {
    const file = await this.fileUpload.saveFile(photo);
    return this.userRepo.create({ ...createUserDto, photo: `/${file}` });
  }

  // User is_active ni true qilish
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link yu');
    }
    const updateUser = await this.userRepo.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      },
    );
    if (!updateUser[1][0]) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updateUser[1][0].is_active,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.is_active) {
      throw new BadRequestException('User not activated');
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: user.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not verified');
    }
    console.log(userData.id);

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    console.log(updateUser);

    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };

    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('id does not match');
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updateUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      {
        where: { id: user.id },
        returning: true,
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async findUser(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.full_name) {
      where['full_name'] = {
        [Op.like]: `%${findUserDto.full_name}%`,
      };
    }

    if (findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}%`,
      };
    }

    if (findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}%`,
      };
    }

    if (findUserDto.tg_link) {
      where['tg_link'] = {
        [Op.like]: `%${findUserDto.tg_link}%`,
      };
    }
    console.log(where);

    const users = await this.userRepo.findAll({ where });
    if (!users) {
      throw new BadRequestException('User not found');
    }

    return users;
  }

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException('Avval botdan royxatdan oting');
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { check: phone_number },
    });
    const newOtp = await this.otpRepo.create({
      id: v4(),
      otp,
      expiration_time,
      check: phone_number,
    });

    const details = {
      timestamp: now,
      check: phone_number,
      otp_id: newOtp.id,
    };
    const encoded = await encode(JSON.stringify(details));

    return { status: 'OK', details: encoded };
  }

  async verifyOtp(veriFyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, check } = veriFyOtpDto;
    const currentDate = new Date();
    const decoded = await decode(verification_key);
    const details = JSON.parse(decoded);
    if (details.check != check) {
      throw new BadRequestException('OTP bu raqamga yuborilmagan');
    }
    const resultOtp = await this.otpRepo.findOne({
      where: { id: details.otp_id },
    });

    if (resultOtp == null) {
      throw new BadRequestException("Bunday OTP yo'q");
    }
    if (resultOtp.verified) {
      throw new BadRequestException('Bu OTP allaqachon tekshirilgan');
    }
    if (!dates.compare(resultOtp.expiration_time, currentDate)) {
      throw new BadRequestException('Bu OTPning vaqti tugagan');
    }
    if (otp !== resultOtp.otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.userRepo.update(
      {
        is_owner: true,
      },
      {
        where: { phone: check },
        returning: true,
      },
    );
    if (!user[1][0]) {
      throw new BadRequestException("Bunday Foydalanuvchi yo'q");
    }
    await this.otpRepo.update(
      { verified: true },
      { where: { id: details.otp_id } },
    );

    const response = {
      message: "Siz owner bo'ldingiz",
      user: user[1][0],
    };
    return response;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
