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
import { ApiTags } from '@nestjs/swagger'
import { CreateVkUserDto } from './dto/create-vk-user.dto'
import { UpdateVkUserDto } from './dto/update-vk-user.dto'
import { VkUserService } from './vk-user.service'

@ApiTags('VK User')
@Controller('vk-user')
export class VkUserController {
	constructor(private readonly vkUserService: VkUserService) {}

	@Post()
	async create(@Body() createVkUserDto: CreateVkUserDto) {
		try {
			return await this.vkUserService.create(createVkUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Patch(':id')
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
