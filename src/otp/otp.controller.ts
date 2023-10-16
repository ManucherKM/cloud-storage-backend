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
	async create(@Body() createOtpDto: CreateOtpDto) {
		try {
			return await this.otpService.create(createOtpDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
