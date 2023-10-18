import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import env from 'env-var'
import { ActivationService } from './activation.service'

@ApiTags('Activation')
@Controller('activation')
export class ActivationController {
	constructor(private readonly activationService: ActivationService) {}

	@Get(':key')
	async activationAccount(@Param('key') key: string, @Res() res) {
		try {
			const CLIENT_URL = env.get('CLIENT_URL').required().asString()
			await this.activationService.activationAccount(key)
			res.status(302).redirect(CLIENT_URL + '/accountConfirm')
			return { success: true }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
