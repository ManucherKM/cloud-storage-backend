import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { File } from './entities/file.entity'

@Injectable()
export class FileService {
	constructor(
		@InjectModel(File.name) private readonly fileModel: Model<File>,
	) {}

	async create(userId: string, file: Express.Multer.File) {
		const foundFile = await this.findByFileName(file.filename)

		if (foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		await this.fileModel.create({
			fileName: file.filename,
			mimetype: file.mimetype,
			originalName: file.originalname,
			size: file.size,
			userId,
		})

		return { success: true }
	}

	async findByFileName(fileName: string) {
		return await this.fileModel.findOne({ fileName })
	}

	async findByUserId(userId: string) {
		return await this.fileModel.find({ userId })
	}

	async findById(id: string) {
		return await this.fileModel.findById({ _id: id })
	}

	async trashOn(fileId: string) {
		const foundFile = await this.findById(fileId)

		if (!foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		foundFile.inTheTrash = true

		return await foundFile.save()
	}

	async trashOff(fileId: string) {
		const foundFile = await this.findById(fileId)

		if (!foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		foundFile.inTheTrash = false

		return await foundFile.save()
	}

	async remove(fileId: string) {
		const foundFile = await this.findById(fileId)

		if (!foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		foundFile.isDeleted = true

		return await foundFile.save()
	}
}
