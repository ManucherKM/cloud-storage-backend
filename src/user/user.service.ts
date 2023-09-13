import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { verify } from 'hcaptcha';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (foundUser && foundUser.isActivated) {
      throw new BadRequestException('Invalid email or password');
    }

    if (foundUser && !foundUser.isActivated) {
      await this.sendMailAccountActivation(
        createUserDto.email,
        foundUser.activationKey,
      );

      return { success: true };
    }

    const isVerifyHcaptcha = await this.verifyHcaptcha(createUserDto.token);

    if (!isVerifyHcaptcha) {
      throw new BadRequestException('Invalid token.');
    }

    const passwordHash = await this.getPasswordHash(createUserDto.password);

    const activationKey = v4();

    await this.userModel.create({
      email: createUserDto.email,
      password: passwordHash,
      activationKey,
    });

    await this.sendMailAccountActivation(createUserDto.email, activationKey);

    return { success: true };
  }

  private async verifyHcaptcha(token: string) {
    const { success } = await verify(process.env.HCAPTCHA_SECRET_KEY, token);
    return success;
  }

  private async getPasswordHash(password: string) {
    const salt = 10;
    const passwordHash = await hash(password, salt);
    return passwordHash;
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

  async findByActivationKey(activationKey: string) {
    return await this.userModel.findOne({ activationKey });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
