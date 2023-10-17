import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileService } from './file.service'
import { fileStorage } from './storage'

@ApiTags('File')
@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

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
	@ApiConsumes('multipart/form-data')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: fileStorage,
		}),
	)
	@Post()
	async create(
		@UploadedFile() file: Express.Multer.File,
		@GetUserIdByToken() userId: string,
	) {
		try {
			const createdFile = await this.fileService.create(userId, file)
			const formatedFile = this.fileService.formatFileModel(createdFile)
			return formatedFile
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('userId')
	async findByUserId(@GetUserIdByToken() userId: string) {
		try {
			const foundFiles = await this.fileService.findByUserId(userId)
			const formatedFiles = foundFiles.map(file =>
				this.fileService.formatFileModel(file.toObject()),
			)
			return formatedFiles
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('trash/on/:fileId')
	async trashOn(@Param('fileId') fileId: string) {
		try {
			const updatedFile = await this.fileService.trashOn(fileId)
			const formatedFile = this.fileService.formatFileModel(updatedFile)
			return formatedFile
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('trash/off/:fileId')
	async trashOff(@Param('fileId') fileId: string) {
		try {
			const updatedFile = await this.fileService.trashOff(fileId)
			const formatedFile = this.fileService.formatFileModel(updatedFile)
			return formatedFile
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete(':fileId')
	async remove(@Param('fileId') fileId: string) {
		try {
			const { isDeleted } = await this.fileService.remove(fileId)
			return { success: isDeleted }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
