import { PartialType } from '@nestjs/swagger'
import { CreateVkUserDto } from './create-vk-user.dto'

export class UpdateVkUserDto extends PartialType(CreateVkUserDto) {}
