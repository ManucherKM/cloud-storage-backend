import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegistrationWithGoogleDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string
}
