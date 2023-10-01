import { FileModule } from '@/file/file.module'
import { JwtModule } from '@/jwt/jwt.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArchiveController } from './archive.controller'
import { ArchiveService } from './archive.service'
import { Archive, ArchiveSchema } from './entities/archive.entity'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Archive.name, schema: ArchiveSchema }]),
		FileModule,
		JwtModule,
	],
	controllers: [ArchiveController],
	providers: [ArchiveService],
})
export class ArchiveModule {}
