import {CALL_DETAILS} from '../Redux/Action'
const initialState = {
    updateclientdetails:[]
}

export default (state = initialState, action) => {
	switch (action.type) {
           case CALL_DETAILS.updateclientdetails:
               return{
                   ...state,
                   updateclientdetails:action.payload
               }
		default:
			break
	}
	return state
}