import { Module } from '@nestjs/common'
import { UserModule } from 'src/user/user.module'
import { ActivationController } from './activation.controller'
import { ActivationService } from './activation.service'

@Module({
	imports: [UserModule],
	controllers: [ActivationController],
	providers: [ActivationService],
})
export class ActivationModule {}
