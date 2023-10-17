import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { GoogleUserService } from './google-user.service'

@ApiTags('Google User')
@Controller('google-user')
export class GoogleUserController {
	constructor(private readonly googleUserService: GoogleUserService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				googleId: {
					default: 'YOUR_ID',
				},
				email: {
					default: 'test@gmail.com',
				},
				verifiedEmail: {
					default: true,
				},
				name: {
					default: 'Mike Smith',
				},
				givenName: {
					default: 'Mike',
				},
				familyName: {
					default: 'Smith',
				},
				picture: {
					default: 'https://avatars.githubusercontent.com/u/82129323',
				},
				locale: {
					default: 'ru',
				},
			},
		},
	})
	@Post()
	async create(@Body() createGoogleUserDto: CreateGoogleUserDto) {
		try {
			const createdUser =
				await this.googleUserService.create(createGoogleUserDto)
			return createdUser.toObject()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
