import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateVkUserDto } from './dto/create-vk-user.dto'
import { UpdateVkUserDto } from './dto/update-vk-user.dto'
import { VkUser } from './entities/vk-user.entity'

@Injectable()
export class VkUserService {
	constructor(
		@InjectModel(VkUser.name) private readonly vkUserModel: Model<VkUser>,
	) {}

	async create(createVkUserDto: CreateVkUserDto) {
		const foundUser = await this.findByVkId(createVkUserDto.vkId)

		if (foundUser) {
			throw new BadRequestException('This user already exists')
		}

		return await this.vkUserModel.create(createVkUserDto)
	}

	async findById(id: string) {
		return await this.vkUserModel.findById({ _id: id })
	}

	async findByVkId(vkId: number) {
		return await this.vkUserModel.findOne({ vkId })
	}

	async findAll() {
		return await this.vkUserModel.find()
	}

	async update(id: string, updateVkUserDto: UpdateVkUserDto) {
		return await this.vkUserModel.updateOne({ _id: id }, updateVkUserDto)
	}

	async remove(id: string) {
		return await this.vkUserModel.deleteOne({ _id: id })
	}
}
