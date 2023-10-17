import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateOtpDto } from './dto/create-otp.dto'
import { OtpService } from './otp.service'

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
	constructor(private readonly otpService: OtpService) {}

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
	async create(@Body() createOtpDto: CreateOtpDto) {
		try {
			const otp = await this.otpService.create(createOtpDto)
			return otp
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
