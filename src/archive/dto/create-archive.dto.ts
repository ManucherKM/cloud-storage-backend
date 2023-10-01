import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArchiveDto {
	@IsString()
	@IsNotEmpty()
	userId: string

	@IsString({ each: true })
	fileIds: string[]
}
