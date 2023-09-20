import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateVkUserDto {
	@IsNumber()
	vkId: number

	@IsString()
	@IsNotEmpty()
	bdate: string

	@IsUrl()
	photo400Orig: string

	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsString()
	@IsNotEmpty()
	lastName: string
}
