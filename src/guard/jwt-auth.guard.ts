import { JwtService } from '@/jwt/jwt.service'
import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest()
		const token = req.headers.authorization.split(' ')[1]

		console.log(token)

		const [isValid] = await this.jwtService.validateToken('access', token)

		return isValid
	}
}
