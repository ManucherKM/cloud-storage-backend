import { Module } from '@nestjs/common'
import { GoogleUserService } from './google-user.service'
import { GoogleUserController } from './google-user.controller'
import { GoogleUser, GoogleUserSchema } from './entities/google-user.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: GoogleUser.name, schema: GoogleUserSchema },
		]),
	],
	controllers: [GoogleUserController],
	providers: [GoogleUserService],
	exports: [GoogleUserService],
})
export class GoogleUserModule {}
