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

	@UseGuards(JwtAuthGuard)
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

	@Get('fileName/:fileName')
	async findById(@Param('fileName') fileName: string) {
		try {
			return await this.fileService.findByFileName(fileName)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('userId')
	async findByUserId(@GetUserIdByToken() userId: string) {
		try {
			return await this.fileService.findByUserId(userId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('trash/on/:fileId')
	async trashOn(@Param('fileId') fileId: string) {
		try {
			return await this.fileService.trashOn(fileId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('trash/off/:fileId')
	async trashOff(@Param('fileId') fileId: string) {
		try {
			return await this.fileService.trashOff(fileId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete(':fileId')
	async remove(@Param('fileId') fileId: string) {
		try {
			return await this.fileService.remove(fileId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
