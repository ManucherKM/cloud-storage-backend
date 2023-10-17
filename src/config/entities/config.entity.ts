import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type ConfigDocument = HydratedDocument<Config>

@Schema({
	timestamps: true,
})
export class Config {
	@Prop({
		required: true,
		unique: true,
		type: SchemaTypes.ObjectId,
		ref: 'User',
	})
	userId: string

	@Prop({
		default: null,
		type: SchemaTypes.ObjectId,
		ref: 'Theme',
	})
	themeId: string | null

	@Prop({ default: null })
	round: string | null
}

export const ConfigSchema = SchemaFactory.createForClass(Config)
