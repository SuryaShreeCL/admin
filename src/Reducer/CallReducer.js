import { CALL_DETAILS } from '../Redux/Action'
const initialState = {
    updateclientdetails: [],
    updateQuestions:[],
    updateRating:[],
    getPersonalInfo:[],
    updatePersonalInfo: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CALL_DETAILS.updateclientdetails:
            return {
                ...state,
                updateclientdetails: action.payload
            }
            case CALL_DETAILS.updateQuestions:
            return {
                ...state,
                updateQuestions: action.payload
            }
            case CALL_DETAILS.updateRating:
            return {
                ...state,
                updateRating: action.payload
            }
            case CALL_DETAILS.getPersonalInfo:
            return {
                ...state,
                getPersonalInfo: action.payload
            }
            case CALL_DETAILS.updatePersonalInfo:
            return {
                ...state,
                updatePersonalInfo: action.payload
            }
        default:
            break
    }
    return state
}

