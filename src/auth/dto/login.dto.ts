import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class LoginDto {
	@IsEmail()
	@ApiProperty({
		default: 'test@gmail.com',
	})
	email: string

	@Matches(passwordRegex)
	@ApiProperty({
		default: 'TestPassword123!?',
	})
	password: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		default: 'YOUR_HCAPTCHA_TOKEN',
	})
	token: string
}
