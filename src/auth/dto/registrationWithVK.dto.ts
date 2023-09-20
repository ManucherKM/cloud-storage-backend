import { IsNotEmpty, IsString } from 'class-validator'

export class RegistrationWithVKDto {
	@IsString()
	@IsNotEmpty()
	code: string

	// @IsUrl()
	@IsString()
	@IsNotEmpty()
	redirectUri: string
}
