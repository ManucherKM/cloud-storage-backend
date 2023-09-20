import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileService } from './file.service'
import { fileStorage } from './storage'

@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: fileStorage,
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	create(@UploadedFile() file: Express.Multer.File) {
		// return this.fileService.create(createFileDto);

		console.log(file)

		return true
	}
}
