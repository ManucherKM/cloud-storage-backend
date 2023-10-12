import { generate } from 'otp-generator'

export function getOtp(length: number) {
	return +generate(length, {
		upperCaseAlphabets: false,
		specialChars: false,
		lowerCaseAlphabets: false,
	})
}
