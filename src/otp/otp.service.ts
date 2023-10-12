import { getOtp } from '@/utils/getOtp'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateOtpDto } from './dto/create-otp.dto'
import { Otp } from './entities/otp.entity'

@Injectable()
export class OtpService {
	constructor(
		@InjectModel(Otp.name)
		private readonly otpModel: Model<Otp>,
	) {}

	async create({ email }: CreateOtpDto) {
		const foundOtp = await this.findbyEmail(email)

		const otp = await this.generateOtp(email)

		if (foundOtp) {
			foundOtp.otp = otp
			await foundOtp.save()
			return otp
		}

		await this.otpModel.create({
			email,
			otp,
		})

		return otp
	}

	async findbyEmail(email: string) {
		return await this.otpModel.findOne({ email })
	}

	async findbyOtp(otp: number) {
		return await this.otpModel.findOne({ otp })
	}

	async generateOtp(email: string): Promise<number> {
		const otp = getOtp(6)

		const foundOtp = await this.findbyOtp(otp)

		if (foundOtp) {
			return await this.generateOtp(email)
		}

		return otp
	}

	async removeByOtp(otp: number) {
		const foundOtp = await this.findbyOtp(otp)

		if (!foundOtp) {
			throw new BadRequestException('The one-time password could not be found.')
		}

		return await this.otpModel.deleteOne({ otp })
	}
}
