import { ThemeService } from '@/theme/theme.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateConfigDto } from './dto/create-config.dto'
import { UpdateConfigDto } from './dto/update-config.dto'
import { Config } from './entities/config.entity'

@Injectable()
export class ConfigService {
	constructor(
		@InjectModel(Config.name) private configModel: Model<Config>,
		private readonly themeService: ThemeService,
	) {}

	async create(userId: string, createConfigDto: CreateConfigDto) {
		const foundConfig = await this.findByUserId(userId)

		if (foundConfig) {
			throw new BadRequestException('This configuration already exists.')
		}

		const foundTheme = await this.themeService.findById(createConfigDto.themeId)

		if (!foundTheme) {
			throw new BadRequestException('Could not find a topic with this id.')
		}

		await this.configModel.create({ userId, ...createConfigDto })

		return { success: true }
	}

	async update(userId: string, updateConfigDto: UpdateConfigDto) {
		const updatedConfig = await this.configModel.updateOne(
			{ userId },
			updateConfigDto,
		)

		return { success: !!updatedConfig.modifiedCount }
	}

	async findByUserId(userId: string) {
		const foundConfig = await this.configModel.findOne({ userId })

		if (!foundConfig) {
			return null
		}

		const foundTheme = await this.themeService.findById(foundConfig?.themeId)

		const formatedTheme = this.themeService.themeDto(foundTheme)

		return {
			round: foundConfig.round,
			theme: formatedTheme,
		}
	}
}
