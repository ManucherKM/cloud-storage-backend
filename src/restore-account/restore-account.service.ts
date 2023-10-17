import { JwtService } from '@/jwt/jwt.service'
import { OtpService } from '@/otp/otp.service'
import { UserService } from '@/user/user.service'
import { MailerService } from '@nestjs-modules/mailer'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateRestoreAccountDto } from './dto/create-restore-account.dto'
import { VerificationOtpDto } from './dto/verification-otp.dto'

@Injectable()
export class RestoreAccountService {
	constructor(
		private readonly otpService: OtpService,
		private readonly mailerService: MailerService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async createOtp({ email }: CreateRestoreAccountDto) {
		const foundUser = await this.userService.findByEmail(email)

		if (!foundUser?.isActivated) {
			throw new BadRequestException('The user could not be found.')
		}

		const otp = await this.otpService.create({ email })

		await this.sendOtpToEmail(otp, email)

		return otp
	}

	async sendOtpToEmail(otp: number, email: string) {
		return await this.mailerService.sendMail({
			to: email,
			from: process.env.NODEMAILER_USER,
			subject: 'Cloud-Storage account restore.',
			html: `OTP code: ${otp}`,
		})
	}

	async verificationOtp({ email, otp }: VerificationOtpDto) {
		const foundUser = await this.userService.findByEmail(email)

		if (!foundUser?.isActivated) {
			throw new BadRequestException('The user could not be found.')
		}

		const foundOtp = await this.otpService.findbyOtp(otp)

		if (!foundOtp || foundOtp.email !== email) {
			throw new BadRequestException('Failed to find OTP.')
		}

		const userId = foundUser._id.toString()

		const accessToken = this.jwtService.getAccessToken({
			userId,
		})

		await this.otpService.removeByOtp(otp)

		return {
			accessToken,
		}
	}
}
