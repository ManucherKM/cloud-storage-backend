import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { JwtService } from '../jwt.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const req: Request = context.switchToHttp().getRequest()
		const token = req.headers.authorization.split(' ')[1]
		console.log(token)
		const [isValid, data] = await this.jwtService.validateToken('access', token)
		if (!isValid) {
			return false
		}

		return true
	}
}
