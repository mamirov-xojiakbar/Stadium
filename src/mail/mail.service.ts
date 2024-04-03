import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/model/user.model';
import { log } from 'console';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/users/activate/${user.activation_link}`;
    log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to stadium App! Confirmation your email',
      template: './confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }

  async sendMailAdmin(admin: Admin) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/admin/activate/${admin.activation_link}`;
    log(url);
    await this.mailerService.sendMail({
      to: admin.login,
      subject: 'Welcome to stadium App! Confirmation your email',
      template: './confirmation',
      context: {
        name: "Admin",
        url,
      },
    });
  }
}
