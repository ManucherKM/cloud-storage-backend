import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ThemeDocument = HydratedDocument<Theme>

@Schema({
	timestamps: true,
})
export class Theme {
	@Prop({ required: true })
	black1000: string

	@Prop({ required: true })
	black500: string

	@Prop({ required: true })
	black250: string

	@Prop({ required: true })
	dominant1: string

	@Prop({ required: true })
	dominant2: string

	@Prop({ required: true })
	warning: string
}

export const ThemeSchema = SchemaFactory.createForClass(Theme)
