import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import env from 'env-var'
import { google } from 'googleapis'
import { Model } from 'mongoose'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { GoogleUser } from './entities/google-user.entity'

@Injectable()
export class GoogleUserService {
	private readonly Oauth2Client = new google.auth.OAuth2(
		env.get('GOOGLE_CLIENT_ID').required().asString(),
		env.get('GOOGLE_CLIENT_SECRET').required().asString(),
		env.get('CLIENT_URL').required().asString(),
	)

	constructor(
		@InjectModel(GoogleUser.name)
		private readonly googleUserModel: Model<GoogleUser>,
	) {}

	async create(createGoogleUserDto: CreateGoogleUserDto) {
		const foundUser = await this.findByEmail(createGoogleUserDto.email)

		if (foundUser) {
			throw new BadRequestException('Failed to create user')
		}

		return await this.googleUserModel.create(createGoogleUserDto)
	}

	async getUserInfoByCode(code: string) {
		const { tokens } = await this.Oauth2Client.getToken(code)

		const { access_token } = tokens

		this.Oauth2Client.setCredentials({ access_token })

		const oauth2 = google.oauth2({ auth: this.Oauth2Client, version: 'v2' })

		const { data } = await oauth2.userinfo.get()

		return data
	}

	async findById(id: string) {
		return await this.googleUserModel.findById({ _id: id })
	}

	async findByEmail(email: string) {
		return await this.googleUserModel.findOne({ email })
	}
}
