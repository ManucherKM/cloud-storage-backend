export interface IVKAccessTokenResponse {
	access_token: string
	expires_in: number
	user_id: number
}

export interface IVKUserInfoResponse {
	response: {
		id: number
		bdate: string
		photo_400_orig: string
		first_name: string
		last_name: string
		can_access_closed: boolean
		is_closed: boolean
	}[]
}
