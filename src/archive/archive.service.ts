import { FileService } from '@/file/file.service'
import { FileModel } from '@/file/types'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import AdmZip from 'adm-zip'
import { Model } from 'mongoose'
import path from 'path'
import { CreateArchiveDto } from './dto/create-archive.dto'
import { Archive } from './entities/archive.entity'

@Injectable()
export class ArchiveService {
	constructor(
		@InjectModel(Archive.name)
		private readonly archiveModel: Model<Archive>,
		private readonly fileService: FileService,
	) {}

	async create(userId: string, { fileIds }: CreateArchiveDto) {
		const isFilesExist = await this.isFilesExist(fileIds)

		if (!isFilesExist) {
			throw new BadRequestException('The file could not be found.')
		}

		const createdArchive = await this.archiveModel.create({
			userId,
			fileIds,
		})

		return createdArchive
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

	async findById(id: string) {
		return await this.archiveModel.findById({ _id: id })
	}

	async share(id: string) {
		const foundArchive = await this.findById(id)

		if (!foundArchive) {
			throw new BadRequestException(
				'The archive containing the files could not be found.',
			)
		}

		const populatedArchive = await foundArchive.populate<{
			fileIds: FileModel[]
		}>('fileIds')

		const files = populatedArchive.fileIds

		const zip = new AdmZip()

		for (const file of files) {
			const filePath = path.join('uploads', file.fileName)
			zip.addLocalFile(filePath, undefined, file.originalName)
		}

		const zipBuffer = zip.toBuffer()

		return zipBuffer
	}
}
