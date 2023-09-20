import {
	Body,
	Controller,
	Delete,
	Get,
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
				vkId: { default: 'YOUR_ID' },
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
			return await this.vkUserService.create(createVkUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Patch(':id')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				vkId: { default: 'YOUR_ID' },
				bdate: { default: '01.01.1999' },
				photo400Orig: {
					default: 'https://avatars.githubusercontent.com/u/82129323',
				},
				firstName: { default: 'Mike' },
				lastName: { default: 'Smith' },
			},
		},
	})
	async update(
		@Param('id') id: string,
		@Body() updateVkUserDto: UpdateVkUserDto,
	) {
		try {
			return this.vkUserService.update(id, updateVkUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('id/:id')
	async findById(@Param('id') id: string) {
		try {
			return await this.vkUserService.findById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('vkId/:vkId')
	async findByVkId(@Param('vkId') vkId: string) {
		try {
			return await this.vkUserService.findByVkId(+vkId)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('all')
	async findAll() {
		try {
			return await this.vkUserService.findAll()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			return await this.vkUserService.remove(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
