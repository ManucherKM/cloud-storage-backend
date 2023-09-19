import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type VkUserDocument = HydratedDocument<VkUser>

@Schema({
	timestamps: true,
})
export class VkUser {
	@Prop({ required: true, unique: true })
	vkId: number

	@Prop({ required: true })
	bdate: string

	@Prop({ required: true })
	photo400Orig: string

	@Prop({ required: true })
	firstName: string

	@Prop({ required: true })
	lastName: string
}

export const VkUserSchema = SchemaFactory.createForClass(VkUser)
