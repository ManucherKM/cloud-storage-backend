import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	Delete,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
				password: {
					default: 'Test123!?',
				},
				activationKey: {
					default: 'YOUR_KEY',
				},
			},
		},
	})
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		try {
			const createdUser = await this.userService.create(createUserDto)
			return createdUser.toObject()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					default: 'test@gmail.com',
				},
				password: {
					default: 'Test123!?',
				},
				activationKey: {
					default: 'YOUR_KEY',
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch()
	async update(
		@GetUserIdByToken() userId: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		try {
			const updatedUser = await this.userService.update(userId, updateUserDto)
			return { success: !!updatedUser.modifiedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			const deletedUser = await this.userService.remove(id)
			return { success: !!deletedUser.deletedCount }
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
