import { IsPhoneNumber } from "class-validator";

export class VerifyOtpDto {
  verification_key: string;
  otp: string;
  check: string;
}
