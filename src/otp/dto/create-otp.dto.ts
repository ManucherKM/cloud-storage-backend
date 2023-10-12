import { IsEmail } from 'class-validator'

export class CreateOtpDto {
	@IsEmail()
	email: string
}
