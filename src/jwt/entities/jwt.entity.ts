import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type JwtDocument = HydratedDocument<Jwt>

@Schema({
	timestamps: true,
})
export class Jwt {
	@Prop({
		type: SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	})
	userId: string

	@Prop({ required: true, unique: true })
	refreshToken: string
}

export const JwtSchema = SchemaFactory.createForClass(Jwt)
