import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { GoogleUserService } from './google-user.service'

@ApiTags('Google User')
@UseGuards(JwtAuthGuard)
@Controller('google-user')
export class GoogleUserController {
	constructor(private readonly googleUserService: GoogleUserService) {}

	@Post()
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
	async create(@Body() createGoogleUserDto: CreateGoogleUserDto) {
		try {
			return await this.googleUserService.create(createGoogleUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('id/:id')
	async findById(@Param('id') id: string) {
		try {
			return await this.googleUserService.findById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('googleId/:googleId')
	async findByGoogleId(@Param('googleId') googleId: string) {
		try {
			return await this.googleUserService.findByGoogleId(googleId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('email/:email')
	async findByEmail(@Param('email') email: string) {
		try {
			return await this.googleUserService.findByEmail(email)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('all')
	async findAll() {
		try {
			return await this.googleUserService.findAll()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			return await this.googleUserService.remove(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
