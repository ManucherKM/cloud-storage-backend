import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginDto,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    return accessToken;
  }
}
