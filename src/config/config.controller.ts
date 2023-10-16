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

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				round: {
					type: 'string',
					default: '10',
				},
				themeId: {
					default: 'YOUR_THEME_ID',
				},
			},
		},
	})
	async create(
		@GetUserIdByToken() userId: string,
		@Body() createConfigDto: CreateConfigDto,
	) {
		return await this.configService.create(userId, createConfigDto)
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				themeId: {
					default: 'YOUR_THEME_ID',
				},
			},
		},
	})
	async update(
		@GetUserIdByToken() userId: string,
		@Body() updateConfigDto: UpdateConfigDto,
	) {
		try {
			return await this.configService.update(userId, updateConfigDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findByUserId(@GetUserIdByToken() userId: string) {
		return await this.configService.findByUserId(userId)
	}
}
