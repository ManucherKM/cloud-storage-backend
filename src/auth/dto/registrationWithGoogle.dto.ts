import { IsNotEmpty, IsString } from 'class-validator'

export class RegistrationWithGoogleDto {
	@IsString()
	@IsNotEmpty()
	code: string
}
