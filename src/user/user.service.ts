import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { verify } from 'hcaptcha';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new BadRequestException('Invalid email or password');
    }

    const isVerifyHcaptcha = await this.verifyHcaptcha(createUserDto.token);

    if (!isVerifyHcaptcha) {
      throw new BadRequestException('Invalid token.');
    }

    const passwordHash = await this.getPasswordHash(createUserDto.password);

    return 'User';
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

  findAll() {
    return `This action returns all user`;
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
