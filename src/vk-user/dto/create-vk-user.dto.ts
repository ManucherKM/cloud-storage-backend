import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateVkUserDto {
	@ApiProperty({
		default: 'YOUR_VK_ID',
	})
	@IsNumber()
	vkId: number

	@ApiProperty({
		default: '21.12.2000',
	})
	@IsString()
	@IsNotEmpty()
	bdate: string

	@ApiProperty({
		default: 'https://avatars.githubusercontent.com/u/82129323',
	})
	@IsUrl()
	photo400Orig: string

	@ApiProperty({
		default: 'Mike',
	})
	@IsString()
	@IsNotEmpty()
	firstName: string

	@ApiProperty({
		default: 'Smith',
	})
	@IsString()
	@IsNotEmpty()
	lastName: string
}
