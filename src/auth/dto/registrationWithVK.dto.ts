import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class RegistrationWithVKDto {
	@ApiProperty({
		default: 'YOUR_VK_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string

	@ApiProperty({
		default: 'YOUR_REDIRECT_URI',
	})
	@IsUrl()
	redirectUri: string
}
