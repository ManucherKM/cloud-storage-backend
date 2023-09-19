import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { LoginWithGoogleDto } from './dto/loginWithGoogle.dto'
import { RegistrationDto } from './dto/registration.dto'
import { RegistrationWithGoogleDto } from './dto/registrationWithGoogle.dto'
import { RegistrationWithVKDto } from './dto/registrationWithVK.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('registration')
	async registration(@Body() registrationDto: RegistrationDto) {
		return await this.authService.registration(registrationDto)
	}

	@Post('login')
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.login(loginDto)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		})

		return { accessToken }
	}

	@Post('login/google')
	async loginWithGoogle(
		@Body() loginWithGoogleDto: LoginWithGoogleDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } =
			await this.authService.loginWithGoogle(loginWithGoogleDto)

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
		})

		return { accessToken }
	}

	@Post('registration/google')
	async registrationWithGoogle(
		@Body() registrationWithGoogleDto: RegistrationWithGoogleDto,
	) {
		return await this.authService.registrationWithGoogle(
			registrationWithGoogleDto,
		)
	}

	@Post('registration/vk')
	async registrationWithVK(
		@Body() registrationWithVKDto: RegistrationWithVKDto,
	) {
		console.log(registrationWithVKDto)

		return await this.authService.registrationWithVK(registrationWithVKDto)
	}
}
