import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { GoogleUserService } from './google-user.service'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'

@ApiTags('Google User')
@Controller('google-user')
export class GoogleUserController {
	constructor(private readonly googleUserService: GoogleUserService) {}

	@Post()
	async create(@Body() createGoogleUserDto: CreateGoogleUserDto) {
		return await this.googleUserService.create(createGoogleUserDto)
	}

	@ApiParam({ name: 'id', type: String })
	@Get('id/:id')
	async findById(@Param('id') id: Types.ObjectId) {
		return await this.googleUserService.findById(id)
	}

	@ApiParam({ name: 'googleId', type: String })
	@Get('googleId/:googleId')
	async findByGoogleId(@Param('googleId') googleId: string) {
		return await this.googleUserService.findByGoogleId(googleId)
	}

	@ApiParam({ name: 'email', type: String })
	@Get('email/:email')
	async findByEmail(@Param('email') email: string) {
		return await this.googleUserService.findByEmail(email)
	}
}
