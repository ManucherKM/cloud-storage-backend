import { IsEmail, Matches, IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class RegistrationDto {
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

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		default: 'YOUR_HCAPTCHA_TOKEN',
	})
	token: string
}
