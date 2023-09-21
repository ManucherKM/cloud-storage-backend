import { GoogleUserModule } from '@/google-user/google-user.module'
import { UserModule } from '@/user/user.module'
import { VkUserModule } from '@/vk-user/vk-user.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Jwt, JwtSchema } from './entities/jwt.entity'
import { JwtController } from './jwt.controller'
import { JwtService } from './jwt.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]),
		UserModule,
		GoogleUserModule,
		VkUserModule,
	],
	controllers: [JwtController],
	providers: [JwtService],
	exports: [JwtService],
})
export class JwtModule {}
