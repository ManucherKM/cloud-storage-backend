import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegistrationWithGoogleDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string
}
