import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { GoogleUserService } from './google-user.service'

@ApiTags('Google User')
@Controller('google-user')
export class GoogleUserController {
	constructor(private readonly googleUserService: GoogleUserService) {}

	@Post()
	async create(@Body() createGoogleUserDto: CreateGoogleUserDto) {
		try {
			return await this.googleUserService.create(createGoogleUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiParam({ name: 'id', type: String })
	@Get('id/:id')
	async findById(@Param('id') id: string) {
		try {
			return await this.googleUserService.findById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiParam({ name: 'googleId', type: String })
	@Get('googleId/:googleId')
	async findByGoogleId(@Param('googleId') googleId: string) {
		try {
			return await this.googleUserService.findByGoogleId(googleId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiParam({ name: 'email', type: String })
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
