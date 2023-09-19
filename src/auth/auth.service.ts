import { GoogleUserService } from '@/google-user/google-user.service'
import { JwtService } from '@/jwt/jwt.service'
import { UserService } from '@/user/user.service'
import { getHash } from '@/utils/getHash'
import { VkUserService } from '@/vk-user/vk-user.service'
import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { compare } from 'bcrypt'
import { verify } from 'hcaptcha'
import { v4 } from 'uuid'
import { LoginDto } from './dto/login.dto'
import { LoginWithGoogleDto } from './dto/loginWithGoogle.dto'
import { LoginWithVkDto } from './dto/loginWithVk.dto'
import { RegistrationDto } from './dto/registration.dto'
import { RegistrationWithGoogleDto } from './dto/registrationWithGoogle.dto'
import { RegistrationWithVKDto } from './dto/registrationWithVK.dto'
import { IVKAccessTokenResponse, IVKUserInfoResponse } from './types'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
		private readonly googleUserService: GoogleUserService,
		private readonly vkUserService: VkUserService,
	) {}

	async registration(registrationDto: RegistrationDto) {
		const foundUser = await this.userService.findByEmail(registrationDto.email)

		if (foundUser && foundUser.isActivated) {
			throw new BadRequestException('This user already exists.')
		}

		if (foundUser && !foundUser.isActivated) {
			await this.sendMailAccountActivation(
				registrationDto.email,
				foundUser.activationKey,
			)

			return { success: true }
		}

		const isVerifyHcaptcha = await this.verifyHcaptcha(registrationDto.token)

		if (!isVerifyHcaptcha) {
			throw new BadRequestException('Invalid token.')
		}

		const passwordHash = await getHash(registrationDto.password)

		const activationKey = v4()

		await this.userService.create({
			email: registrationDto.email,
			password: passwordHash,
			activationKey,
		})

		await this.sendMailAccountActivation(registrationDto.email, activationKey)

		return { success: true }
	}

	async login(loginDto: LoginDto) {
		const foundUser = await this.userService.findByEmail(loginDto.email)

		if (!foundUser || !foundUser.isActivated) {
			throw new BadRequestException('Incorrect login or password.')
		}

		const isVerifyHcaptcha = await this.verifyHcaptcha(loginDto.token)

		if (!isVerifyHcaptcha) {
			throw new BadRequestException('Invalid token.')
		}

		const isCorrectPassword = await compare(
			loginDto.password,
			foundUser.password,
		)

		if (!isCorrectPassword) {
			throw new BadRequestException('Incorrect login or password.')
		}

		const userId = foundUser._id.toString()

		const payload = { userId }

		const refreshToken = await this.jwtService.generateRefreshToken(payload)

		const accessToken = this.jwtService.getAccessToken(payload)

		return {
			refreshToken,
			accessToken,
		}
	}

	async loginWithGoogle({ code }: LoginWithGoogleDto) {
		const { email } = await this.googleUserService.getUserInfoByCode(code)

		const foundUser = await this.googleUserService.findByEmail(email)

		if (!foundUser) {
			throw new BadRequestException('User is not found.')
		}

		const userId = foundUser._id.toString()

		const payload = { userId }

		const refreshToken = await this.jwtService.generateRefreshToken(payload)

		const accessToken = this.jwtService.getAccessToken(payload)

		return {
			refreshToken,
			accessToken,
		}
	}

	async loginWithVk({ code, redirectUri }: LoginWithVkDto) {
		const vkAccessToken = await this.getVKAccessToken(code, redirectUri)

		const userInfo = await this.getVKUserInfo(vkAccessToken)

		const foundUser = await this.vkUserService.findByVkId(userInfo.id)

		if (!foundUser) {
			throw new BadRequestException('User is not found.')
		}

		const userId = foundUser._id.toString()

		const payload = { userId }

		const refreshToken = await this.jwtService.generateRefreshToken(payload)

		const accessToken = this.jwtService.getAccessToken(payload)

		return {
			refreshToken,
			accessToken,
		}
	}

	async registrationWithGoogle({ code }: RegistrationWithGoogleDto) {
		const userInfo = await this.googleUserService.getUserInfoByCode(code)

		await this.googleUserService.create({
			email: userInfo.email,
			familyName: userInfo.family_name,
			givenName: userInfo.given_name,
			googleId: userInfo.id,
			locale: userInfo.locale,
			name: userInfo.name,
			picture: userInfo.picture,
			verifiedEmail: userInfo.verified_email,
		})

		return { success: true }
	}

	async registrationWithVK({ code, redirectUri }: RegistrationWithVKDto) {
		const accessToken = await this.getVKAccessToken(code, redirectUri)

		const userInfo = await this.getVKUserInfo(accessToken)

		await this.vkUserService.create({
			vkId: userInfo.id,
			bdate: userInfo.bdate,
			firstName: userInfo.first_name,
			lastName: userInfo.last_name,
			photo400Orig: userInfo.photo_400_orig,
		})

		return { success: true }
	}

	private async getVKUserInfo(access_token: string) {
		const { data } = await axios.get<IVKUserInfoResponse>(
			'https://api.vk.com/method/users.get',
			{
				params: {
					access_token,
					v: '5.131',
					fields: ['bdate', 'photo_400_orig'],
				},
			},
		)

		const userInfo = data.response[0]

		if (!userInfo.id) {
			throw new BadRequestException('Invalid access token.')
		}

		return userInfo
	}

	private async getVKAccessToken(code: string, redirectUri: string) {
		const { data } = await axios.get<IVKAccessTokenResponse>(
			'https://oauth.vk.com/access_token',
			{
				params: {
					client_id: process.env.VK_CLIENT_ID,
					client_secret: process.env.VK_SECRET,
					redirect_uri: redirectUri,
					code,
				},
			},
		)

		if (!data.access_token) {
			throw new BadRequestException('Invalid code.')
		}

		return data.access_token
	}

	private async sendMailAccountActivation(
		email: string,
		activationKey: string,
	) {
		const activationLink =
			process.env.API_URL + '/api/activation/' + activationKey
		await this.mailerService.sendMail({
			to: email,
			from: process.env.NODEMAILER_USER,
			subject: 'Cloud-Storage Account Confirmation.',
			html: `<a href="${activationLink}">Click on the link.</a>`,
		})
	}

	private async verifyHcaptcha(token: string) {
		const { success } = await verify(process.env.HCAPTCHA_SECRET_KEY, token)
		return success
	}
}
