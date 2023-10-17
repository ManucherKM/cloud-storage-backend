import { IsOptional, IsString } from 'class-validator'

export class CreateConfigDto {
	@IsOptional()
	@IsString()
	round: string

	@IsOptional()
	@IsString()
	themeId: string
}
