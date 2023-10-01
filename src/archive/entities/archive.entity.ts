import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type ArchiveDocument = HydratedDocument<Archive>

@Schema({
	timestamps: true,
})
export class Archive {
	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
	userId: string

	@Prop({ required: true })
	fileIds: string[]
}

export const ArchiveSchema = SchemaFactory.createForClass(Archive)
