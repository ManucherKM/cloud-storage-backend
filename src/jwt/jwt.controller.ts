import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	Req,
} from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { Types } from 'mongoose'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { UpdateJwtDto } from './dto/update-jwt.dto'
import { JwtService } from './jwt.service'

@ApiTags('JWT')
@Controller('jwt')
export class JwtController {
	constructor(private readonly jwtService: JwtService) {}

	@Post()
	async create(@Body() createJwtDto: CreateJwtDto) {
		try {
			return await this.jwtService.create(createJwtDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Patch(':id')
	@ApiParam({ name: 'id', type: String })
	async update(
		@Param('id') id: Types.ObjectId,
		@Body() updateJwtDto: UpdateJwtDto,
	) {
		try {
			return this.jwtService.update(id, updateJwtDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiParam({ name: 'userId', type: String })
	@Get('userId/:userId')
	async findByUserId(@Param('userId') userId: Types.ObjectId) {
		try {
			return await this.jwtService.findByUserId(userId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiParam({ name: 'id', type: String })
	@Get('id/:id')
	async findById(@Param('id') id: Types.ObjectId) {
		try {
			return await this.jwtService.findById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Post('token')
	async getNewAccessToken(@Req() req: Request) {
		try {
			const refreshToken = req.cookies['refreshToken']
			return await this.jwtService.getNewAccessToken(refreshToken)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
