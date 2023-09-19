import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		default: 'test@gmail.com',
	})
	email?: string

	@ApiProperty({
		default: 'TestPassword123!?',
	})
	password?: string

	@ApiProperty({
		default: 'YOUR_ACTIVATION_KEY',
	})
	activationKey?: string
}
