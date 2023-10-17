import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class LoginWithVkDto {
	@IsString()
	@IsNotEmpty()
	code: string

	@IsUrl()
	redirectUri: string
}
