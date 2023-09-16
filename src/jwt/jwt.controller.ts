import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { UpdateJwtDto } from './dto/update-jwt.dto'

@ApiTags('JWT')
@Controller('jwt')
export class JwtController {
	constructor(private readonly jwtService: JwtService) {}

	@Post()
	async create(@Body() createJwtDto: CreateJwtDto) {
		return await this.jwtService.create(createJwtDto)
	}

	@Patch(':id')
	@ApiParam({ name: 'id', type: String })
	async update(
		@Param('id') id: Types.ObjectId,
		@Body() updateJwtDto: UpdateJwtDto,
	) {
		return this.jwtService.update(id, updateJwtDto)
	}

	@ApiParam({ name: 'userId', type: String })
	@Get('userId/:userId')
	async findByUserId(@Param('userId') userId: Types.ObjectId) {
		return await this.jwtService.findByUserId(userId)
	}

	@ApiParam({ name: 'id', type: String })
	@Get('id/:id')
	async findById(@Param('id') id: Types.ObjectId) {
		return await this.jwtService.findById(id)
	}
}
