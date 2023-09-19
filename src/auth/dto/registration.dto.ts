import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class RegistrationDto {
	@ApiProperty({
		default: 'test@gmail.com',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		default: 'TestPassword123!?',
	})
	@Matches(passwordRegex)
	password: string

	@ApiProperty({
		default: 'YOUR_HCAPTCHA_TOKEN',
	})
	@IsNotEmpty()
	@IsString()
	token: string
}
