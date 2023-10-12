import { getDataByToken } from '@/utils/getDataByToken'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor() {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const req = context.switchToHttp().getRequest()
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				return false
			}

			const data = getDataByToken(token, 'access')

			if (!data) {
				return false
			}

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}
}
