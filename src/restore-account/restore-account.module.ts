import { JwtModule } from '@/jwt/jwt.module'
import { OtpModule } from '@/otp/otp.module'
import { UserModule } from '@/user/user.module'
import { Module } from '@nestjs/common'
import { RestoreAccountController } from './restore-account.controller'
import { RestoreAccountService } from './restore-account.service'

@Module({
	imports: [OtpModule, UserModule, JwtModule],
	controllers: [RestoreAccountController],
	providers: [RestoreAccountService],
})
export class RestoreAccountModule {}
