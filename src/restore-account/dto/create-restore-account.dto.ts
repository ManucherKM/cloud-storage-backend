import { IsEmail } from 'class-validator'

export class CreateRestoreAccountDto {
	@IsEmail()
	email: string
}
