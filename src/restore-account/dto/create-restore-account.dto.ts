import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRestoreAccountDto {
	@IsNotEmpty()
	@IsString()
	email: string
}
