import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateJwtDto {
	@ApiProperty({
		default: 'USER_ID',
	})
	@IsString()
	userId: string

	@ApiProperty({
		default: 'test@gmail.com',
	})
	@IsEmail()
	email: string
}
