import { PartialType } from '@nestjs/mapped-types'
import { CreateGoogleUserDto } from './create-google-user.dto'

export class UpdateGoogleUserDto extends PartialType(CreateGoogleUserDto) {}
