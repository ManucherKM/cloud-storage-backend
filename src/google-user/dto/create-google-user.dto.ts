import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	IsUrl,
} from 'class-validator'

export class CreateGoogleUserDto {
	@IsString()
	@IsNotEmpty()
	googleId: string

	@IsEmail()
	email: string

	@IsBoolean()
	verifiedEmail: boolean

	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	givenName: string

	@IsString()
	@IsNotEmpty()
	familyName: string

	@IsUrl()
	picture: string

	@IsString()
	@IsNotEmpty()
	locale: string
}
