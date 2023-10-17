import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { ConfigService } from './config.service'
import { CreateConfigDto } from './dto/create-config.dto'
import { UpdateConfigDto } from './dto/update-config.dto'

@ApiTags('Config')
@Controller('config')
export class ConfigController {
	constructor(private readonly configService: ConfigService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				round: {
					type: 'string',
					default: '10',
				},
				themeId: {
					default: 'THEME_ID',
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@GetUserIdByToken() userId: string,
		@Body() createConfigDto: CreateConfigDto,
	) {
		try {
			await this.configService.create(userId, createConfigDto)
			return { success: true }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				themeId: {
					default: 'THEME_ID',
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch()
	async update(
		@GetUserIdByToken() userId: string,
		@Body() updateConfigDto: UpdateConfigDto,
	) {
		try {
			const updatedConfig = await this.configService.update(
				userId,
				updateConfigDto,
			)
			return { success: !!updatedConfig.modifiedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async findByUserId(@GetUserIdByToken() userId: string) {
		try {
			const foundConfig = await this.configService.findByUserId(userId)
			return foundConfig
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
