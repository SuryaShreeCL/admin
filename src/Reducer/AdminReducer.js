import {ADMIN} from "../Redux/Action"
const initialState = {
    adminLoginDetails : [],
	refreshTokenDetails : [],

}
export default (state = initialState, action) => {
	switch (action.type) {
        case ADMIN.adminLogin:
			return {
				...state,
                adminLoginDetails:action.adminLoginDetails,
            }
			case ADMIN.refreshToken:
				return {
					...state,
					refreshTokenDetails:action.refreshTokenDetails,
				}
		default:
			break
	}
	return state
}