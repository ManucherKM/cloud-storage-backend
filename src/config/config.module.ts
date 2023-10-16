import { ThemeModule } from '@/theme/theme.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigController } from './config.controller'
import { ConfigService } from './config.service'
import { Config, ConfigSchema } from './entities/config.entity'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
		ThemeModule,
	],
	controllers: [ConfigController],
	providers: [ConfigService],
})
export class ConfigModule {}
