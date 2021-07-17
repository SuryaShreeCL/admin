import { CALL_DETAILS } from '../Redux/Action'
const initialState = {
    updateclientdetails: [],
    updateQuestions:[],
    updateRating:[],
    getPersonalInfo:[],
    updatePersonalInfo: [],
    academicdetails:[],
    getworkexp : [],
    updateworkexp : []
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
            case CALL_DETAILS.academicdetails:
            return {
                ...state,
                academicdetails: action.payload
            }
            case CALL_DETAILS.updateworkexp:
            return {
                ...state,
                updateworkexp: action.payload
            }
            case CALL_DETAILS.getworkexp:
            return {
                ...state,
                getworkexp: action.payload
            }

        default:
            break
    }
    return state
}

