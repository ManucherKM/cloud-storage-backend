import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
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
					default: 'YOUR_ID',
				},
				fileIds: {
					type: 'array',
					items: {
						type: 'string',
					},
					default: ['YOUR_FILE_ID'],
				},
			},
		},
	})
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post()
	async create(
		@Body() createArchiveDto: CreateArchiveDto,
		@GetUserIdByToken() userId: string,
	) {
		return await this.archiveService.create(userId, createArchiveDto)
	}

	@Get('share/:id')
	async share(@Param('id') id: string) {
		const zip = await this.archiveService.share(id)
		return new StreamableFile(zip)
	}
}
