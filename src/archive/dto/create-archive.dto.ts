import { IsNotEmpty, IsString } from 'class-validator'

export class CreateArchiveDto {
	@IsString({ each: true })
	fileIds: string[]
}
