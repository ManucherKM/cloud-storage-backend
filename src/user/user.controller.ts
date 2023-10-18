import { GetUserIdByToken } from '@/decorators/GetUserIdByToken'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
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
}
