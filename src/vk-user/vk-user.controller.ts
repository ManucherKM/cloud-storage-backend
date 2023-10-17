import {
	Body,
	Controller,
	Delete,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateVkUserDto } from './dto/create-vk-user.dto'
import { UpdateVkUserDto } from './dto/update-vk-user.dto'
import { VkUserService } from './vk-user.service'

@ApiTags('VK User')
@Controller('vk-user')
export class VkUserController {
	constructor(private readonly vkUserService: VkUserService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				vkId: { default: 'VK_ID' },
				bdate: { default: '01.01.1999' },
				photo400Orig: {
					default: 'https://avatars.githubusercontent.com/u/82129323',
				},
				firstName: { default: 'Mike' },
				lastName: { default: 'Smith' },
			},
		},
	})
	@Post()
	async create(@Body() createVkUserDto: CreateVkUserDto) {
		try {
			const createdUser = await this.vkUserService.create(createVkUserDto)
			return createdUser.toObject()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				vkId: { default: 'VK_ID' },
				bdate: { default: '01.01.1999' },
				photo400Orig: {
					default: 'https://avatars.githubusercontent.com/u/82129323',
				},
				firstName: { default: 'Mike' },
				lastName: { default: 'Smith' },
			},
		},
	})
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateVkUserDto: UpdateVkUserDto,
	) {
		try {
			const updatedUser = await this.vkUserService.update(id, updateVkUserDto)
			return { success: !!updatedUser.modifiedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const deletedUser = await this.vkUserService.remove(id)
			return { success: !!deletedUser.deletedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
