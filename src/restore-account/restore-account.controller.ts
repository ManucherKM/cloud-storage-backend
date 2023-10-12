import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateRestoreAccountDto } from './dto/create-restore-account.dto'
import { VerificationOtpDto } from './dto/verification-otp.dto'
import { RestoreAccountService } from './restore-account.service'

@ApiTags('Restore account')
@Controller('restore-account')
export class RestoreAccountController {
	constructor(private readonly restoreAccountService: RestoreAccountService) {}

	@Post()
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
			},
		},
	})
	async createOtp(@Body() createRestoreAccountDto: CreateRestoreAccountDto) {
		return await this.restoreAccountService.createOtp(createRestoreAccountDto)
	}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
				otp: {
					default: '636421',
				},
			},
		},
	})
	@Post('verification')
	async verificationOtp(@Body() verificationOtpDto: VerificationOtpDto) {
		return await this.restoreAccountService.verificationOtp(verificationOtpDto)
	}
}
