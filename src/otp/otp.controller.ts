import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { CreateOtpDto } from './dto/create-otp.dto'
import { OtpService } from './otp.service'

@Controller('otp')
export class OtpController {
	constructor(private readonly otpService: OtpService) {}

	@Post()
	async create(@Body() createOtpDto: CreateOtpDto) {
		try {
			return await this.otpService.create(createOtpDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
