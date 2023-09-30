import { JwtModule } from '@/jwt/jwt.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FileArchive, FileArchiveSchema } from './entities/file-archive.entity'
import { File, FileSchema } from './entities/file.entity'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
		MongooseModule.forFeature([
			{ name: FileArchive.name, schema: FileArchiveSchema },
		]),
		JwtModule,
	],
	controllers: [FileController],
	providers: [FileService],
})
export class FileModule {}
