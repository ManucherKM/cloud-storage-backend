import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
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

	@Post()
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
	async create(@Body() createUserDto: CreateUserDto) {
		try {
			return await this.userService.create(createUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
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
	update(
		@GetUserIdByToken() userId: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		try {
			console.log(userId, updateUserDto)

			return this.userService.update(userId, updateUserDto)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('email/:email')
	async findByEmail(@Param('email') email: string) {
		try {
			return await this.userService.findByEmail(email)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('id/:id')
	async findById(@Param('id') id: string) {
		try {
			return await this.userService.findById(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('activationKey/:activationKey')
	async findByActivationKey(@Param('activationKey') activationKey: string) {
		try {
			return await this.userService.findByActivationKey(activationKey)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Get('all')
	async findAll() {
		try {
			return await this.userService.findAll()
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			return await this.userService.remove(id)
		} catch (e) {
			throw new HttpException({ message: e.message }, HttpStatus.BAD_REQUEST)
		}
	}
}
