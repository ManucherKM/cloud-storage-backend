import { IsNotEmpty, IsString } from 'class-validator'

export class CreateThemeDto {
	@IsNotEmpty()
	@IsString()
	black1000: string

	@IsNotEmpty()
	@IsString()
	black500: string

	@IsNotEmpty()
	@IsString()
	black250: string

	@IsNotEmpty()
	@IsString()
	dominant1: string

	@IsNotEmpty()
	@IsString()
	dominant2: string

	@IsNotEmpty()
	@IsString()
	warning: string
}
