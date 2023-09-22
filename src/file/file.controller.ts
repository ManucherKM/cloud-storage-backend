import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Post,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { Request as RequestType } from 'express'
import { CreateFileDto } from './dto/create-file.dto'
import { FileService } from './file.service'
import { fileStorage } from './storage'

@ApiTags('File')
@UseGuards(JwtAuthGuard)
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
	@ApiBearerAuth()
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
	async create(
		@UploadedFile() file: Express.Multer.File,
		@GetUserIdByToken() userId: string,
	) {
		return await this.fileService.create(userId, file)
	}
}
