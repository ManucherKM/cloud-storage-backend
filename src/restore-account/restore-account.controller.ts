import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateRestoreAccountDto } from './dto/create-restore-account.dto'
import { VerificationOtpDto } from './dto/verification-otp.dto'
import { RestoreAccountService } from './restore-account.service'

@ApiTags('Restore account')
@Controller('restore-account')
export class RestoreAccountController {
	constructor(private readonly restoreAccountService: RestoreAccountService) {}

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
	@Post()
	async createOtp(@Body() createRestoreAccountDto: CreateRestoreAccountDto) {
		try {
			await this.restoreAccountService.createOtp(createRestoreAccountDto)
			return { success: true }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
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
		try {
			const { accessToken } =
				await this.restoreAccountService.verificationOtp(verificationOtpDto)

			return { accessToken }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
