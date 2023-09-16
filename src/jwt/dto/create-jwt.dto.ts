import { Types } from 'mongoose'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateJwtDto {
	@ApiProperty({
		default: 'USER_ID',
	})
	@IsString()
	userId: Types.ObjectId

	@ApiProperty({
		default: 'test@gmail.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string
}
