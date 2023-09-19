import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VkUser, VkUserSchema } from './entities/vk-user.entity'
import { VkUserController } from './vk-user.controller'
import { VkUserService } from './vk-user.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: VkUser.name, schema: VkUserSchema }]),
	],
	controllers: [VkUserController],
	providers: [VkUserService],
	exports: [VkUserService],
})
export class VkUserModule {}
