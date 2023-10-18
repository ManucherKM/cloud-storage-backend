import { Controller } from '@nestjs/common'
import { VkUserService } from './vk-user.service'

@Controller('vk-user')
export class VkUserController {
	constructor(private readonly vkUserService: VkUserService) {}
}
