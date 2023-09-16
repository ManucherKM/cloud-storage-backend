import { IsEmail, Matches, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class CreateUserDto {
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

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		default: 'YOUR_ACTIVATION_KEY',
	})
	activationKey: string
}
