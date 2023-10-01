import { FileService } from '@/file/file.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateArchiveDto } from './dto/create-archive.dto'
import { Archive } from './entities/archive.entity'

@Injectable()
export class ArchiveService {
	constructor(
		@InjectModel(Archive.name)
		private readonly archiveModel: Model<Archive>,
		private readonly fileService: FileService,
	) {}

	async create({ userId, fileIds }: CreateArchiveDto) {
		const isFilesExist = await this.isFilesExist(fileIds)

		if (!isFilesExist) {
			throw new BadRequestException('The file could not be found.')
		}

		const createdArchive = await this.archiveModel.create({
			userId,
			fileIds,
		})

		return { id: createdArchive._id }
	}

	private async isFilesExist(fileIds: string[]) {
		const filePromises = []

		for (const id of fileIds) {
			const filePromise = this.fileService.findById(id)
			filePromises.push(filePromise)
		}

		const files = await Promise.all(filePromises)

		const isFileNotFound = files.some(file => file === null)

		return !isFileNotFound
	}

	async findByUserId(userId: string) {
		return await this.archiveModel.findOne({ userId })
	}
}
