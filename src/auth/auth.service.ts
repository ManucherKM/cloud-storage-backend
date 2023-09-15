import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from '@/user/user.service';
import { MailerService } from '@nestjs-modules/mailer';
import { verify } from 'hcaptcha';
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    const foundUser = await this.userService.findByEmail(registrationDto.email);

    if (foundUser && foundUser.isActivated) {
      throw new BadRequestException('Incorrect login or password.');
    }

    if (foundUser && !foundUser.isActivated) {
      await this.sendMailAccountActivation(
        registrationDto.email,
        foundUser.activationKey,
      );

      return { success: true };
    }

    const isVerifyHcaptcha = await this.verifyHcaptcha(registrationDto.token);

    if (!isVerifyHcaptcha) {
      throw new BadRequestException('Invalid token.');
    }

    const passwordHash = await this.getPasswordHash(registrationDto.password);

    const activationKey = v4();

    await this.userService.create({
      email: registrationDto.email,
      password: passwordHash,
      activationKey,
    });

    await this.sendMailAccountActivation(registrationDto.email, activationKey);

    return { success: true };
  }

  private async sendMailAccountActivation(
    email: string,
    activationKey: string,
  ) {
    const activationLink = process.env.API_URL + '/activation/' + activationKey;
    await this.mailerService.sendMail({
      to: email,
      from: process.env.NODEMAILER_USER,
      subject: 'Cloud-Storage Account Confirmation.',
      html: `<a href="${activationLink}">Click on the link.</a>`,
    });
  }

  private async getPasswordHash(password: string) {
    const salt = 10;
    const passwordHash = await hash(password, salt);
    return passwordHash;
  }

  private async verifyHcaptcha(token: string) {
    const { success } = await verify(process.env.HCAPTCHA_SECRET_KEY, token);
    return success;
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.userService.findByEmail(loginDto.email);

    if (foundUser && !foundUser.isActivated) {
      throw new BadRequestException('Invalid user');
    }

    const isVerifyHcaptcha = await this.verifyHcaptcha(loginDto.token);

    if (!isVerifyHcaptcha) {
      throw new BadRequestException('Invalid token.');
    }

    const isCorrectPassword = await compare(
      loginDto.password,
      foundUser.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Incorrect login or password.');
    }

    const userId = foundUser._id;

    const payload = {
      userId,
      email: loginDto.email,
    };

    const refreshToken = await this.jwtService.generateRefreshToken(
      userId,
      payload,
    );

    const accessToken = await this.jwtService.generateAccessToken(
      refreshToken,
      payload,
    );

    return {
      refreshToken,
      accessToken,
    };
  }
}
