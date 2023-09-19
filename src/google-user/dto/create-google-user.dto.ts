import { ApiProperty } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	IsUrl,
} from 'class-validator'

export class CreateGoogleUserDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_ID',
	})
	@IsString()
	@IsNotEmpty()
	googleId: string

	@ApiProperty({
		default: 'test@gmail.com',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		default: true,
	})
	@IsBoolean()
	verifiedEmail: boolean

	@ApiProperty({
		default: 'Mike Smith',
	})
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({
		default: 'Mike',
	})
	@IsString()
	@IsNotEmpty()
	givenName: string

	@ApiProperty({
		default: 'Smith',
	})
	@IsString()
	@IsNotEmpty()
	familyName: string

	@ApiProperty({
		default: 'https://avatars.githubusercontent.com/u/82129323',
	})
	@IsUrl()
	picture: string

	@IsString()
	@IsNotEmpty()
	locale: string
}
