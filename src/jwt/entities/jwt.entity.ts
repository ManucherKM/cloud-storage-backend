import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'

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
	userId: Types.ObjectId

	@Prop({ required: true, unique: true })
	refreshToken: string
}

export const JwtSchema = SchemaFactory.createForClass(Jwt)
