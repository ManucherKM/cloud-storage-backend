import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GoogleUser, GoogleUserSchema } from './entities/google-user.entity'
import { GoogleUserController } from './google-user.controller'
import { GoogleUserService } from './google-user.service'

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
