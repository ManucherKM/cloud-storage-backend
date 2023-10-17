import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	StreamableFile,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { ArchiveService } from './archive.service'
import { CreateArchiveDto } from './dto/create-archive.dto'

@ApiTags('Archive')
@Controller('archive')
export class ArchiveController {
	constructor(private readonly archiveService: ArchiveService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				userId: {
					default: 'USER_ID',
				},
				fileIds: {
					type: 'array',
					items: {
						type: 'string',
					},
					default: ['FILE_ID'],
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@Body() createArchiveDto: CreateArchiveDto,
		@GetUserIdByToken() userId: string,
	) {
		try {
			const createdArchive = await this.archiveService.create(
				userId,
				createArchiveDto,
			)
			return { id: createdArchive._id }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('share/:id')
	async share(@Param('id') id: string) {
		try {
			const zipBuffer = await this.archiveService.share(id)
			return new StreamableFile(zipBuffer)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
