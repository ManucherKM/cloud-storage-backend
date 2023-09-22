import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 5000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	)

	app.setGlobalPrefix('api')

	app.use(cookieParser())

	app.enableCors({ origin: '*' })

	const config = new DocumentBuilder()
		.setTitle('Cloud storage API')
		.setDescription(
			'Interactive documentation for cloud-storage API (https://github.com/ManucherKM/cloud-storage-backend)',
		)
		.setVersion('0.0.1')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('docs', app, document)

	await app.listen(PORT)
}

bootstrap()
