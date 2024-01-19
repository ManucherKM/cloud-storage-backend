import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VkUser, VkUserSchema } from './entities/vk-user.entity'
import { VkUserService } from './vk-user.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: VkUser.name, schema: VkUserSchema }]),
	],
	providers: [VkUserService],
	exports: [VkUserService],
})
export class VkUserModule {}
