import { JwtService } from '@/jwt/jwt.service'
import { getDataByToken } from '@/utils/getDataByToken'
import {
	CanActivate,
	createParamDecorator,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const req = context.switchToHttp().getRequest()
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				return false
			}

			const [isValid] = await this.jwtService.validateToken(token, 'access')

			return isValid
		} catch (e) {
			console.error(e)
		}
	}
}
