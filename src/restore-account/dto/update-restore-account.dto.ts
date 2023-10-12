import { PartialType } from '@nestjs/swagger'
import { CreateRestoreAccountDto } from './create-restore-account.dto'

export class UpdateRestoreAccountDto extends PartialType(
	CreateRestoreAccountDto,
) {}
