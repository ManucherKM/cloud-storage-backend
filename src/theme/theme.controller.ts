import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateThemeDto } from './dto/create-theme.dto'
import { ThemeService } from './theme.service'

@ApiTags('Theme')
@Controller('theme')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				black1000: {
					default: '#000000',
				},
				black500: {
					default: '#ffffff',
				},
				black250: {
					default: '#f2f2f2',
				},
				dominant1: {
					default: '#0f0f0f',
				},
				dominant2: {
					default: '#2ev2e2',
				},
				warning: {
					default: 'pink',
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@GetUserIdByToken() userId: string,
		@Body() createThemeDto: CreateThemeDto,
	) {
		try {
			const createdTheme = await this.themeService.create(
				userId,
				createThemeDto,
			)
			return createdTheme.toObject()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('all')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findAll() {
		try {
			const foundThemes = await this.themeService.findAll()
			return {
				themes: foundThemes,
			}
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
