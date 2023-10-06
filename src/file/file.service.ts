import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { SendFileDto } from './dto/send-file.dto'
import { File } from './entities/file.entity'

export type TFileModel = File & {
	_id: Types.ObjectId
} & Required<{
		_id: Types.ObjectId
	}>

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

		return this.formatFileModel(createdFile.toObject())
	}

	async findByFileName(fileName: string) {
		return await this.fileModel.findOne({ fileName })
	}

	async findByUserId(userId: string) {
		const foundFiles = await this.fileModel.find({ userId })

		const foundFilesObject = foundFiles.filter(file => !file.isDeleted)

		return foundFilesObject.map(item => this.formatFileModel(item.toObject()))
	}

	async findById(id: string) {
		return await this.fileModel.findById({ _id: id })
	}

	private formatFileModel(fileModel: TFileModel) {
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

		const savedFile = await foundFile.save()

		return this.formatFileModel(savedFile.toObject())
	}

	async trashOff(fileId: string) {
		const foundFile = await this.findById(fileId)

		if (!foundFile) {
			throw new BadRequestException('Such a file already exists.')
		}

		foundFile.inTheTrash = false

		const savedFile = await foundFile.save()

		return this.formatFileModel(savedFile.toObject())
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
