import { getHash } from '@/utils/getHash'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async create(createUserDto: CreateUserDto) {
		const foundUser = await this.findByEmail(createUserDto.email)

		if (foundUser) {
			throw new BadRequestException('This user already exists')
		}

		return await this.userModel.create(createUserDto)
	}

	async update(userId: string, updateUserDto: UpdateUserDto) {
		const { password, ...other } = updateUserDto

		if (password) {
			const passwordHash = await getHash(password)
			return await this.userModel.updateOne(
				{ _id: userId },
				{ password: passwordHash, ...other },
			)
		}

		const updatedOtp = await this.userModel.updateOne(
			{ _id: userId },
			updateUserDto,
		)

		return updatedOtp.acknowledged
	}

	async findByActivationKey(activationKey: string) {
		return await this.userModel.findOne({ activationKey })
	}

	async findByEmail(email: string) {
		return await this.userModel.findOne({ email })
	}

	async findById(id: string) {
		return await this.userModel.findById({ _id: id })
	}

	async findAll() {
		return await this.userModel.find()
	}

	async remove(id: string) {
		return await this.userModel.deleteOne({ _id: id })
	}
}
