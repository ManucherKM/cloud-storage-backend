import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type FileDocument = HydratedDocument<File>

@Schema({
	timestamps: true,
})
export class File {
	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
	userId: string

	@Prop({ required: true, unique: true })
	fileName: string

	@Prop({ required: true })
	originalName: string

	@Prop({ required: true })
	size: number

	@Prop({ required: true })
	mimetype: string

	@Prop({ default: false })
	inTheTrash: boolean

	@Prop({ default: false })
	isDeleted: boolean
}

export const FileSchema = SchemaFactory.createForClass(File)
