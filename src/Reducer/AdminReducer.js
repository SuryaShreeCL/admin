import {ADMIN} from "../Redux/Action"
const initialState = {
    adminLoginDetails : [],
	refreshTokenDetails : [],
	studentAccessResponse : [],

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
				case ADMIN.studentAccess:
				return {
					...state,
					studentAccessResponse:action.studentAccessResponse,
				}

		default:
			break
	}
	return state
}