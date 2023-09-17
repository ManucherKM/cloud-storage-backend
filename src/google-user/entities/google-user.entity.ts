import { HydratedDocument } from 'mongoose'
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'

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
	verified_email: boolean

	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	given_name: string

	@Prop({ required: true })
	family_name: string

	@Prop({ required: true })
	picture: string

	@Prop({ required: true })
	locale: string
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser)
