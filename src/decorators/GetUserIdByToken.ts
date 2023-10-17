import { getDataByToken } from '@/utils/getDataByToken'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUserIdByToken = createParamDecorator(
	(_: unknown, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest()
		const token = req.headers.authorization?.split(' ')[1]
		const { userId } = getDataByToken(token, 'access')

		return userId
	},
)
