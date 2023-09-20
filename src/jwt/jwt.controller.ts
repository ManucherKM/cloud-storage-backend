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
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { UpdateJwtDto } from './dto/update-jwt.dto'
import { JwtService } from './jwt.service'

@ApiTags('JWT')
@Controller('jwt')
export class JwtController {
	constructor(private readonly jwtService: JwtService) {}

	@Post()
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				userId: {
					default: 'YOUR_ID',
				},
			},
		},
	})
	async create(@Body() createJwtDto: CreateJwtDto) {
		try {
			return await this.jwtService.create(createJwtDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Patch(':id')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				userId: {
					default: 'YOUR_ID',
				},
			},
		},
	})
	async update(@Param('id') id: string, @Body() updateJwtDto: UpdateJwtDto) {
		try {
			return this.jwtService.update(id, updateJwtDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('userId/:userId')
	async findByUserId(@Param('userId') userId: string) {
		try {
			return await this.jwtService.findByUserId(userId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('id/:id')
	async findById(@Param('id') id: string) {
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
