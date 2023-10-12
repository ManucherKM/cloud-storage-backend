import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type OtpDocument = HydratedDocument<Otp>

@Schema({
	timestamps: true,
})
export class Otp {
	@Prop({ required: true, unique: true })
	email: string
	@Prop({ required: true, unique: true })
	otp: number
}

export const OtpSchema = SchemaFactory.createForClass(Otp)
