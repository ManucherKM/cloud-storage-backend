import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MailerModule } from '@nestjs-modules/mailer'
import { ActivationModule } from './activation/activation.module'
import { AuthModule } from './auth/auth.module'

// App
@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		MailerModule.forRoot({
			transport: {
				host: process.env.NODEMAILER_SMTP_HOST,
				auth: {
					user: process.env.NODEMAILER_USER,
					pass: process.env.NODEMAILER_PASSWORD,
				},
			},
		}),
		AuthModule,
		ActivationModule,
	],
})
export class AppModule {}
