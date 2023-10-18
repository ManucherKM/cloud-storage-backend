import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import env from 'env-var'
import { ActivationModule } from './activation/activation.module'
import { ArchiveModule } from './archive/archive.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule as UserConfigModule } from './config/config.module'
import { FileModule } from './file/file.module'
import { OtpModule } from './otp/otp.module'
import { RestoreAccountModule } from './restore-account/restore-account.module'
import { ThemeModule } from './theme/theme.module'

// App
@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(env.get('MONGODB_URL').required().asString()),
		MailerModule.forRoot({
			transport: {
				host: env.get('NODEMAILER_SMTP_HOST').required().asString(),
				auth: {
					user: env.get('NODEMAILER_USER').required().asString(),
					pass: env.get('NODEMAILER_PASSWORD').required().asString(),
				},
			},
		}),
		AuthModule,
		ActivationModule,
		FileModule,
		ArchiveModule,
		OtpModule,
		RestoreAccountModule,
		ThemeModule,
		UserConfigModule,
	],
})
export class AppModule {}
