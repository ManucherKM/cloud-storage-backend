import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginWithGoogleDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string
}
