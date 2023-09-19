import { hash } from 'bcrypt'

export async function getHash(str: string) {
	return await hash(str, 10)
}
