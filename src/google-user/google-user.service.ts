import { Injectable } from '@nestjs/common'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { GoogleUser } from './entities/google-user.entity'
import { Model, Types } from 'mongoose'
import { google } from 'googleapis'
import { IGoogleUser } from './types'

@Injectable()
export class GoogleUserService {
	private readonly Oauth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.CLIENT_URL,
	)

	constructor(
		@InjectModel(GoogleUser.name)
		private readonly googleUserModel: Model<GoogleUser>,
	) {}

	async create({ code }: CreateGoogleUserDto) {
		const user: IGoogleUser = await this.getUserInfoByCode(code)
		return await this.googleUserModel.create(user)
	}

	async getUserInfoByCode(code: string) {
		const { tokens } = await this.Oauth2Client.getToken(code)

		const { access_token } = tokens

		this.Oauth2Client.setCredentials({ access_token })

		const oauth2 = google.oauth2({ auth: this.Oauth2Client, version: 'v2' })

		const { data } = await oauth2.userinfo.get()

		const { id, ...other } = data

		return {
			googleId: id,
			...other,
		} as IGoogleUser
	}

	async findById(id: Types.ObjectId) {
		return await this.googleUserModel.findById({ _id: id })
	}

	async findByEmail(email: string) {
		return await this.googleUserModel.findOne({ email })
	}

	async findByGoogleId(googleId: string) {
		return await this.googleUserModel.findOne({ googleId })
	}
}
