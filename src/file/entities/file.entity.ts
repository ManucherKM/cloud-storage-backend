import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type FileDocument = HydratedDocument<File>

@Schema({
	timestamps: true,
})
export class File {
	@Prop({ required: true, unique: true })
	fileName: string

	@Prop({ required: true })
	originalName: string

	@Prop({ required: true })
	size: number

	@Prop({ required: true })
	mimetype: string

	@Prop({ required: true })
	inTheTrash: boolean

	@Prop({ required: true })
	isDeleted: boolean
}

export const FileSchema = SchemaFactory.createForClass(File)