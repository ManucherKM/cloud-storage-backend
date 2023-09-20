import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'

const passwordRegex = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,32}$)',
)

export class CreateUserDto {
	@IsEmail()
	email: string

	@Matches(passwordRegex)
	password: string

	@IsString()
	@IsNotEmpty()
	activationKey: string
}
