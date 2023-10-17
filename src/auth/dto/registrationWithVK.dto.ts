import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class RegistrationWithVKDto {
	@IsString()
	@IsNotEmpty()
	code: string

	@IsUrl()
	redirectUri: string
}
