import { Module } from '@nestjs/common'
import { GoogleUserService } from './google-user.service'
import { GoogleUserController } from './google-user.controller'

@Module({
	controllers: [GoogleUserController],
	providers: [GoogleUserService],
})
export class GoogleUserModule {}
