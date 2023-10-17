import { IDataToken } from '@/jwt/types'
import env from 'env-var'
import * as jwt from 'jsonwebtoken'

export enum EVariantGetData {
	access = 'access',
	refresh = 'refresh',
}

export function getDataByToken(token: string, variant: `${EVariantGetData}`) {
	const JWT_REFRESH_SECRET = env.get('JWT_REFRESH_SECRET').required().asString()
	const JWT_ACCESS_SECRET = env.get('JWT_ACCESS_SECRET').required().asString()

	let secret = ''

	if (variant === EVariantGetData.access) {
		secret = JWT_ACCESS_SECRET
	} else if (variant === EVariantGetData.refresh) {
		secret = JWT_REFRESH_SECRET
	}

	return jwt.verify(token, secret) as IDataToken
}
