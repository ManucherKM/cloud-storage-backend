import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import env from 'env-var'
import * as express from 'express'
import { join } from 'path'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 5000
const CLIENT_URL = env.get('CLIENT_URL').required().asString()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	)

	app.setGlobalPrefix('api')

	app.use(cookieParser())

	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

	app.enableCors({ credentials: true, origin: CLIENT_URL })

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
