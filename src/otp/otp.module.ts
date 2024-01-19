import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Otp, OtpSchema } from './entities/otp.entity'
import { OtpService } from './otp.service'

@Module({
	imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
	providers: [OtpService],
	exports: [OtpService],
})
export class OtpModule {}
