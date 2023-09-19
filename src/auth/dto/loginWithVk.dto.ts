import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginWithVkDto {
	@ApiProperty({
		default: 'YOUR_VK_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string

	@ApiProperty({
		default: 'YOUR_REDIRECT_URI',
	})
	// @IsUrl()
	@IsString()
	@IsNotEmpty()
	redirectUri: string
}
