import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SendFileDto } from './dto/send-file.dto'
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

		const createdFile = await this.fileModel.create({
			fileName: file.filename,
			mimetype: file.mimetype,
			originalName: file.originalname,
			size: file.size,
			userId,
		})

		return this.formatFileModel(createdFile)
	}

	async findByFileName(fileName: string) {
		return await this.fileModel.findOne({ fileName })
	}

	async findByUserId(userId: string) {
		const res = await this.fileModel.find({ userId })
		return res.map(item => this.formatFileModel(item))
	}

	async findById(id: string) {
		return await this.fileModel.findById({ _id: id })
	}

	private formatFileModel(fileModel: any) {
		return {
			id: fileModel._id,
			fileName: fileModel.fileName,
			inTheTrash: fileModel.inTheTrash,
			originalName: fileModel.originalName,
		} as SendFileDto
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
