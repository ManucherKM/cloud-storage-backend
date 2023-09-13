import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Injectable()
export class ActivationService {
  constructor(private readonly userService: UserService) {}

  async activationAccount(activationKey: string) {
    const foundUser = await this.userService.findByActivationKey(activationKey);
    foundUser.isActivated = true;
    await foundUser.save();
  }
}
