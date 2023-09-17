import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginWithGoogleDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string
}
