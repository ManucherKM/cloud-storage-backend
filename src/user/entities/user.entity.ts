import { HydratedDocument } from 'mongoose'
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({
	timestamps: true,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ required: true, default: false })
	isActivated: boolean

	@Prop({ required: true, unique: true })
	activationKey: string
}

export const UserSchema = SchemaFactory.createForClass(User)
