import { Controller, Get, Param, Body, Post, Patch } from '@nestjs/common'
import { UserService } from './user.service'

import { ApiTags, ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto)
	}

	@Patch(':id')
	@ApiParam({ name: 'id', type: String })
	update(
		@Param('id') id: Types.ObjectId,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.userService.update(id, updateUserDto)
	}

	@Get('email/:email')
	async findByEmail(@Param('email') email: string) {
		return await this.userService.findByEmail(email)
	}

	@Get('id/:id')
	async findById(@Param('id') id: Types.ObjectId) {
		return await this.userService.findById(id)
	}

	@Get('key/:activationKey')
	async findByActivationKey(@Param('activationKey') activationKey: string) {
		return await this.userService.findByActivationKey(activationKey)
	}
}
