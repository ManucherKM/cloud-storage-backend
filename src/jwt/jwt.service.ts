import { GoogleUserService } from '@/google-user/google-user.service'
import { UserService } from '@/user/user.service'
import { VkUserService } from '@/vk-user/vk-user.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as jwt from 'jsonwebtoken'
import { Model } from 'mongoose'
import { CreateJwtDto } from './dto/create-jwt.dto'
import { UpdateJwtDto } from './dto/update-jwt.dto'
import { Jwt } from './entities/jwt.entity'
import { EVariantValidateToken, IDataToken } from './types'

@Injectable()
export class JwtService {
	constructor(
		@InjectModel(Jwt.name) private jwtModel: Model<Jwt>,
		private readonly userService: UserService,
		private readonly googleUserService: GoogleUserService,
		private readonly vkUserService: VkUserService,
	) {}

	async create(createJwtDto: CreateJwtDto) {
		const refreshToken = await this.generateRefreshToken(createJwtDto)

		const accessToken = this.getAccessToken(createJwtDto)

		return {
			refreshToken,
			accessToken,
		}
	}

	async update(id: string, updateJwtDto: UpdateJwtDto) {
		const refreshToken = await this.generateRefreshToken(updateJwtDto)

		const accessToken = this.getAccessToken(updateJwtDto)

		await this.jwtModel.updateOne(
			{ _id: id },
			{
				refreshToken,
			},
		)

		return {
			refreshToken,
			accessToken,
		}
	}

	async findById(id: string) {
		return await this.jwtModel.findById({ _id: id })
	}

	async findByUserId(userId: string) {
		return await this.jwtModel.findOne({ userId })
	}

	async getNewAccessToken(refreshToken: string) {
		const [isValid, dataToken] = await this.validateToken(
			'refresh',
			refreshToken,
		)

		if (!isValid) {
			throw new BadRequestException('Invalid token.')
		}

		return this.getAccessToken(dataToken)
	}

	getAccessToken(payload: IDataToken) {
		return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: 30 * 60 * 60 * 1000, // 30m
		})
	}

	private getRefreshToken(payload: IDataToken) {
		return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: 30 * 24 * 60 * 60 * 1000, // 30d
		})
	}

	async generateRefreshToken(payload: IDataToken) {
		const foundToken = await this.jwtModel.findOne({ userId: payload.userId })

		if (foundToken) {
			const [isValid, _] = await this.validateToken(
				'refresh',
				foundToken.refreshToken,
			)

			if (isValid) {
				return foundToken.refreshToken
			}

			const token = this.getRefreshToken(payload)

			foundToken.refreshToken = token

			await foundToken.save()

			return token
		}

		const refreshToken = this.getRefreshToken(payload)

		await this.jwtModel.create({
			refreshToken,
			userId: payload.userId,
		})

		return refreshToken
	}

	async validateToken(variant: `${EVariantValidateToken}`, token: string) {
		let secret = ''

		if (variant === EVariantValidateToken.access) {
			secret = process.env.JWT_ACCESS_SECRET
		} else if (variant === EVariantValidateToken.refresh) {
			secret = process.env.JWT_REFRESH_SECRET
		}

		const { userId } = jwt.verify(token, secret) as IDataToken

		const foundUser = await this.userService.findById(userId)

		const foundGoogleUser = await this.googleUserService.findById(userId)

		const foundVkUser = await this.vkUserService.findById(userId)

		const isUserExist = !!foundUser && foundUser.isActivated

		const isGoogleUserExist = foundGoogleUser

		const isVkUserExist = foundVkUser

		const isFound = isUserExist || isGoogleUserExist || isVkUserExist

		if (!isFound) {
			throw new BadRequestException('Invalid token')
		}

		const dataToken: IDataToken = { userId }

		return [true, dataToken] as [boolean, IDataToken]
	}
}
