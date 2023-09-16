import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { GoogleUserService } from './google-user.service'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { UpdateGoogleUserDto } from './dto/update-google-user.dto'

import { ApiTags } from '@nestjs/swagger'

@ApiTags('Google User')
@Controller('google-user')
export class GoogleUserController {
	constructor(private readonly googleUserService: GoogleUserService) {}

	@Post()
	create(@Body() createGoogleUserDto: CreateGoogleUserDto) {
		return this.googleUserService.create(createGoogleUserDto)
	}

	@Get()
	findAll() {
		return this.googleUserService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.googleUserService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateGoogleUserDto: UpdateGoogleUserDto,
	) {
		return this.googleUserService.update(+id, updateGoogleUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.googleUserService.remove(+id)
	}
}
