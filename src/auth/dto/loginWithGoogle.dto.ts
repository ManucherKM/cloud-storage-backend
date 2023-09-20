import { IsNotEmpty, IsString } from 'class-validator'

export class LoginWithGoogleDto {
	@IsString()
	@IsNotEmpty()
	code: string
}
