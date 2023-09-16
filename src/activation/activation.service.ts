import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'

@Injectable()
export class ActivationService {
	constructor(private readonly userService: UserService) {}

	async activationAccount(key: string) {
		const foundUser = await this.userService.findByActivationKey(key)
		foundUser.isActivated = true
		await foundUser.save()
	}
}
