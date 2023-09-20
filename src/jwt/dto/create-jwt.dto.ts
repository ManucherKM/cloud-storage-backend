import { IsNotEmpty, IsString } from 'class-validator'

export class CreateJwtDto {
	@IsString()
	@IsNotEmpty()
	userId: string
}
