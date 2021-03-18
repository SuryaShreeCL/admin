import {ADMIN} from "../Redux/Action"
const initialState = {
    adminLoginDetails : [],
	refreshTokenDetails : [],
	studentAccessResponse : [],
	updatePersonalResponse : [],
	studentStatusResponse : [],
	updateVerificationResponse : [],

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
				case ADMIN.updatePersonalData:
					return {
						...state,
						updatePersonalResponse:action.updatePersonalResponse,
					}
					case ADMIN.viewStudentStatus:
						return {
							...state,
							studentStatusResponse:action.studentStatusResponse,
						}
						case ADMIN.updateVerificationStatus:
						return {
							...state,
							updateVerificationResponse:action.updateVerificationResponse,
						}
		default:
			break
	}
	return state
}