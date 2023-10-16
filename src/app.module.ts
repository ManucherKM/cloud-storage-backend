import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
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
		FileModule,
		ArchiveModule,
		OtpModule,
		RestoreAccountModule,
		ThemeModule,
		UserConfigModule,
	],
})
export class AppModule {}
