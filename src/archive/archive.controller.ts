import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	StreamableFile,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { createReadStream } from 'fs'
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
	async create(@Body() createArchiveDto: CreateArchiveDto) {
		return await this.archiveService.create(createArchiveDto)
	}

	@Get('share/:id')
	async share(@Param('id') id: string) {
		const zip = await this.archiveService.share(id)
		return new StreamableFile(zip)
	}
}
