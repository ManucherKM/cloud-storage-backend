import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GoogleUserDocument = HydratedDocument<GoogleUser>

@Schema({
	timestamps: true,
})
export class GoogleUser {
	@Prop({ required: true, unique: true })
	googleId: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true })
	verifiedEmail: boolean

	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	givenName: string

	@Prop({ required: true })
	familyName: string

	@Prop({ required: true })
	picture: string

	@Prop({ required: true })
	locale: string
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser)
