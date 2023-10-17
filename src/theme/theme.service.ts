import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateThemeDto } from './dto/create-theme.dto'
import { Theme } from './entities/theme.entity'
import { IResponseTheme, ITheme, ThemeModel } from './types'

const defaultThemes: ITheme[] = [
	{
		black1000: '#212529',
		black500: '#282c31',
		black250: '#6e767f',
		dominant1: '#ced4da',
		dominant2: '#ced4da',
		warning: '#dc2f02',
	},
	{
		black1000: '#1b1b1b',
		black500: '#292929',
		black250: '#808080',
		dominant1: '#ffa31a',
		dominant2: '#ffffff',
		warning: '#c71700',
	},
	{
		black1000: '#22272e',
		black500: '#272e35',
		black250: '#6d7887',
		dominant1: '#4895ef',
		dominant2: '#cbd0df',
		warning: '#ef6c75',
	},
	{
		black1000: '#242526',
		black500: '#2f3031',
		black250: '#737373',
		dominant1: '#bc98ea',
		dominant2: '#ebedf0',
		warning: '#bc3174',
	},
	{
		black1000: '#252526',
		black500: '#333333',
		black250: '#818181',
		dominant1: '#6ebbeb',
		dominant2: '#d7d7d7',
		warning: '#f5b732',
	},
]

@Injectable()
export class ThemeService {
	constructor(
		@InjectModel(Theme.name) private readonly themeModel: Model<Theme>,
	) {
		for (const theme of defaultThemes) {
			themeModel
				.find(theme)
				.then(res => {
					if (res.length) {
						return
					}

					themeModel.create(theme).catch(console.error)
				})
				.catch(console.error)
		}
	}

	async create(userId: string, createThemeDto: CreateThemeDto) {
		const foundTheme = await this.foundByTheme(createThemeDto)

		if (foundTheme) {
			throw new BadRequestException('This color theme already exists')
		}

		return await this.themeModel.create({ userId, ...createThemeDto })
	}

	async foundByTheme(theme: ITheme) {
		return await this.themeModel.find(theme)
	}

	async findById(id: string) {
		return await this.themeModel.findById({ _id: id })
	}

	themeDto(theme: ThemeModel): IResponseTheme {
		return {
			id: theme._id.toString(),
			black1000: theme.black1000,
			black500: theme.black500,
			dominant1: theme.dominant1,
			black250: theme.black250,
			dominant2: theme.dominant2,
			warning: theme.warning,
		}
	}

	async findAll() {
		const foundThemes = await this.themeModel.find()

		if (!foundThemes.length) {
			throw new BadRequestException('Could not find color themes.')
		}

		const res: IResponseTheme[] = []

		for (const theme of foundThemes) {
			res.push(this.themeDto(theme))
		}

		return res
	}
}
