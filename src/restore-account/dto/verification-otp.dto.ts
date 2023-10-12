import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class VerificationOtpDto {
	@IsEmail()
	email: string

	@IsNumber()
	otp: number
}
