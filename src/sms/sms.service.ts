import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { log } from 'console';

const FormData = require('form-data');

@Injectable()
export class SmsService {
  async sendSms(phone: string, otp: string) {
    const formdata = new FormData();
    formdata.append('mobile_phone', phone);
    formdata.append('message', `Stadium code: ${otp}`);
    formdata.append('from', `4546`);

    const config = {
      method: 'post',
      maxBodyLenght: Infinity,
      url: process.env.SMS_SERVICE_URL,
      headers: {
        Authorization: `Bearer ${process.env.SMS_TOKEN}`,
      },
      data: formdata,
    };

    try {
      const resp = await axios(config);
      return resp;
    } catch (error) {
      log(error);
      return { status: 500 };
    }
  }

  async refreshToken() {}
  async getToken() {}
}
