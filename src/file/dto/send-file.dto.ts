import { Types } from 'mongoose'

export class SendFileDto {
	id: string | Types.ObjectId
	fileName: string
	originalName: string
	inTheTrash: boolean
}
