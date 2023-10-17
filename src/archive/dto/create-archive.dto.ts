import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArchiveDto {
	@IsNotEmpty()
	@IsString({ each: true })
	fileIds: string[]
}
