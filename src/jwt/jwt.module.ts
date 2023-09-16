import { Module } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { UserModule } from '@/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Jwt, JwtSchema } from './entities/jwt.entity'
import { JwtController } from './jwt.controller'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]),
		UserModule,
	],
	controllers: [JwtController],
	providers: [JwtService],
	exports: [JwtService],
})
export class JwtModule {}
