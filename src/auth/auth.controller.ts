import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { LoginWithGoogleDto } from './dto/loginWithGoogle.dto'
import { LoginWithVkDto } from './dto/loginWithVk.dto'
import { RegistrationDto } from './dto/registration.dto'
import { RegistrationWithGoogleDto } from './dto/registrationWithGoogle.dto'
import { RegistrationWithVKDto } from './dto/registrationWithVK.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('registration')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
				password: {
					default: 'Test123!?',
				},
				token: {
					default: 'YOUR_TOKEN',
				},
			},
		},
	})
	async registration(@Body() registrationDto: RegistrationDto) {
		try {
			return await this.authService.registration(registrationDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('login')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
				password: {
					default: 'Test123!?',
				},
				token: {
					default: 'YOUR_TOKEN',
				},
			},
		},
	})
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		try {
			const { accessToken, refreshToken } =
				await this.authService.login(loginDto)

			res.cookie('refreshToken', refreshToken, { httpOnly: true })

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('login/google')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				code: {
					default: 'YOUR_CODE',
				},
			},
		},
	})
	async loginWithGoogle(
		@Body() loginWithGoogleDto: LoginWithGoogleDto,
		@Res({ passthrough: true }) res: Response,
	) {
		try {
			const { accessToken, refreshToken } =
				await this.authService.loginWithGoogle(loginWithGoogleDto)

			res.cookie('refreshToken', refreshToken, { httpOnly: true })

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('registration/google')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				code: {
					default: 'YOUR_CODE',
				},
			},
		},
	})
	async registrationWithGoogle(
		@Body() registrationWithGoogleDto: RegistrationWithGoogleDto,
	) {
		try {
			return await this.authService.registrationWithGoogle(
				registrationWithGoogleDto,
			)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('login/vk')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				code: {
					default: 'YOUR_CODE',
				},
				redirectUri: {
					default: 'http://localhost:3000/login',
				},
			},
		},
	})
	async loginWithVk(
		@Body() loginWithGoogleDto: LoginWithVkDto,
		@Res({ passthrough: true }) res: Response,
	) {
		try {
			const { accessToken, refreshToken } =
				await this.authService.loginWithVk(loginWithGoogleDto)

			res.cookie('refreshToken', refreshToken, { httpOnly: true })

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('registration/vk')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				code: {
					default: 'YOUR_CODE',
				},
				redirectUri: {
					default: 'http://localhost:3000/registration',
				},
			},
		},
	})
	async registrationWithVK(
		@Body() registrationWithVKDto: RegistrationWithVKDto,
	) {
		try {
			return await this.authService.registrationWithVK(registrationWithVKDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
