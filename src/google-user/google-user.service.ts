import { Injectable } from '@nestjs/common'
import { CreateGoogleUserDto } from './dto/create-google-user.dto'
import { UpdateGoogleUserDto } from './dto/update-google-user.dto'

@Injectable()
export class GoogleUserService {
	create(createGoogleUserDto: CreateGoogleUserDto) {
		return 'This action adds a new googleUser'
	}

	findAll() {
		return `This action returns all googleUser`
	}

	findOne(id: number) {
		return `This action returns a #${id} googleUser`
	}

	update(id: number, updateGoogleUserDto: UpdateGoogleUserDto) {
		return `This action updates a #${id} googleUser`
	}

	remove(id: number) {
		return `This action removes a #${id} googleUser`
	}
}
