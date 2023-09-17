import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateGoogleUserDto {
	@ApiProperty({
		default: 'YOUR_GOOGLE_CODE',
	})
	@IsString()
	@IsNotEmpty()
	code: string
}
