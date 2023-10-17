import { Document, Types } from 'mongoose'
import { File } from '../entities/file.entity'

export type FileModel = Document<unknown, {}, File> &
	File & {
		_id: Types.ObjectId
	}

export class SendFile {
	id: string
	fileName: string
	originalName: string
	inTheTrash: boolean
}
