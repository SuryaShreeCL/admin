import {HELPER} from '../Redux/Action'
const initialState = {
    tempState : []
}

export default (state = initialState, action) => {
	switch (action.type) {
		
                case HELPER.storeItInState:
                    return {
                        ...state,
                        tempState : action.payload
                    }
		default:
			break
	}
	return state
}