import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { CreateJwtDto } from './create-jwt.dto'

export class UpdateJwtDto extends PartialType(CreateJwtDto) {
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
