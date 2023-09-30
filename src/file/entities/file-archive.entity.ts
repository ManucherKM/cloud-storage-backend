import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type FileDocument = HydratedDocument<FileArchive>

@Schema({
	timestamps: true,
})
export class FileArchive {
	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
	userId: string

	@Prop({ required: true })
	fileIds: string[]
}

export const FileArchiveSchema = SchemaFactory.createForClass(FileArchive)
