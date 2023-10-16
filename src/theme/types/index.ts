import { Document, Types } from 'mongoose'
import { Theme } from '../entities/theme.entity'

export interface ITheme {
	black1000: string
	black500: string
	black250: string
	dominant1: string
	dominant2: string
	warning: string
}

export type ThemeModel = Document<unknown, {}, Theme> &
	Theme & {
		_id: Types.ObjectId
	}

export interface IResponseTheme extends ITheme {
	id: string
}
