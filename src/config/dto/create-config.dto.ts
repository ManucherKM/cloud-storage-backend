import { IsOptional, IsString } from 'class-validator'

export class CreateConfigDto {
	@IsString()
	@IsOptional()
	round: string

	@IsOptional()
	@IsString()
	themeId: string
}
