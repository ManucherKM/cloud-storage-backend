import { Types } from 'mongoose'
import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateJwtDto {
	@ApiProperty({
		default: 'USER_ID',
	})
	@IsString()
	userId: Types.ObjectId

	@ApiProperty({
		default: { email: 'test@gmail.com' },
	})
	@IsNotEmpty()
	payload: any
}
