import { GoogleUserModule } from '@/google-user/google-user.module'
import { JwtModule } from '@/jwt/jwt.module'
import { UserModule } from '@/user/user.module'
import { VkUserModule } from '@/vk-user/vk-user.module'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [UserModule, JwtModule, GoogleUserModule, VkUserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
