import { Body, Controller, Get, Param, Patch, Req, Post } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { UpdateJwtDto } from './dto/update-jwt.dto'
import { Request } from 'express'

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

	@Post('token')
	async getNewAccessToken(@Req() req: Request) {
		const refreshToken = req.cookies['refreshToken']

		return await this.jwtService.getNewAccessToken(
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTA1N2FhZGNkODU0ODU3NDlhMGEzYjkiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjk0ODU4MDE0LCJleHAiOjQyODY4NTgwMTR9._tDN9SAhSWna_xnmDXkifJCDLZ4tobqNI5chfWe2vWc',
		)
	}
}
