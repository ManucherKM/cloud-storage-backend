import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateOtpDto {
	@IsEmail()
	email: string
}
