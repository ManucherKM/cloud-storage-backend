import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Jwt } from './entities/jwt.entity';
import { Model, Types } from 'mongoose';
import { UserService } from '@/user/user.service';
import { EVariantValidateToken, IDataToken } from './types';

@Injectable()
export class JwtService {
  constructor(
    @InjectModel(Jwt.name) private jwtModel: Model<Jwt>,
    private readonly userService: UserService,
  ) {}

  private getAccessToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: 30 * 60 * 60 * 1000, // 30m
    });
  }

  async generateAccessToken(
    refreshToken: string,
    payload: string | Object | Buffer,
  ) {
    const isValid = await this.validateToken('refresh', refreshToken);

    if (!isValid) {
      throw new BadRequestException('Invalid refresh token.');
    }

    return this.getAccessToken(payload);
  }

  private async validateToken(
    variant: `${EVariantValidateToken}`,
    token: string,
  ) {
    let secret = '';

    if (variant === EVariantValidateToken.access) {
      secret = process.env.JWT_ACCESS_SECRET;
    } else if (variant === EVariantValidateToken.refresh) {
      secret = process.env.JWT_REFRESH_SECRET;
    }

    const data = jwt.verify(token, secret) as IDataToken;

    const foundUser = await this.userService.findById(data.userId);

    if (!foundUser || !foundUser.isActivated) {
      throw new BadRequestException('Invalid token');
    }

    return true;
  }

  private getRefreshToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: 30 * 24 * 60 * 60 * 1000, // 30d
    });
  }

  async generateRefreshToken(
    userId: Types.ObjectId,
    payload: string | Object | Buffer,
  ) {
    const foundToken = await this.jwtModel.findOne({ userId });

    if (foundToken) {
      const isValid = await this.validateToken(
        'refresh',
        foundToken.refreshToken,
      );

      if (isValid) {
        return foundToken.refreshToken;
      }

      const token = this.getRefreshToken(payload);

      foundToken.refreshToken = token;

      await foundToken.save();

      return token;
    }

    const refreshToken = this.getRefreshToken(payload);

    await this.jwtModel.create({
      refreshToken,
      userId,
    });

    return refreshToken;
  }
}
