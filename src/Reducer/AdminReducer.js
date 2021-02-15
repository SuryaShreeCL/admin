import {ADMIN} from "../Redux/Action"
const initialState = {
    adminLoginDetails : [],
}
export default (state = initialState, action) => {
	switch (action.type) {
        case ADMIN.adminLogin:
			return {
				...state,
                adminLoginDetails:action.adminLoginDetails,
            }
		default:
			break
	}
	return state
}