import { IsNotEmpty, IsString } from 'class-validator'

export class LoginWithVkDto {
	@IsString()
	@IsNotEmpty()
	code: string

	// @IsUrl()
	@IsString()
	@IsNotEmpty()
	redirectUri: string
}
