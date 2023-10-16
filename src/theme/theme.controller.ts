import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateThemeDto } from './dto/create-theme.dto'
import { ThemeService } from './theme.service'

@ApiTags('Theme')
@Controller('theme')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
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
	async create(
		@GetUserIdByToken() userId: string,
		@Body() createThemeDto: CreateThemeDto,
	) {
		return await this.themeService.create(userId, createThemeDto)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findById(@Param('id') id: string) {
		return await this.themeService.findById(id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async findAll() {
		return await this.themeService.findAll()
	}
}
