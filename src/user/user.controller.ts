import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }
}
