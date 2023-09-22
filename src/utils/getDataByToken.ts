import * as jwt from 'jsonwebtoken'

export enum EVariantGetData {
	access = 'access',
	refresh = 'refresh',
}

export interface IDataToken {
	userId: string
}

export function getDataByToken(token: string, variant: `${EVariantGetData}`) {
	let secret = ''

	if (variant === EVariantGetData.access) {
		secret = process.env.JWT_ACCESS_SECRET
	} else if (variant === EVariantGetData.refresh) {
		secret = process.env.JWT_REFRESH_SECRET
	}

	return jwt.verify(token, secret) as IDataToken
}
