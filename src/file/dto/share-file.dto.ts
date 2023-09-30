import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { Types } from 'mongoose'

export class ShareFileDto {
	@IsNotEmpty()
	@IsString({ each: true })
	fileIds: string | Types.ObjectId[]
}
