import { IsEmail, IsNumber } from 'class-validator'

export class VerificationOtpDto {
	@IsEmail()
	email: string

	@IsNumber()
	otp: number
}
