import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Theme, ThemeSchema } from './entities/theme.entity'
import { ThemeController } from './theme.controller'
import { ThemeService } from './theme.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Theme.name, schema: ThemeSchema }]),
	],
	controllers: [ThemeController],
	providers: [ThemeService],
	exports: [ThemeService],
})
export class ThemeModule {}
