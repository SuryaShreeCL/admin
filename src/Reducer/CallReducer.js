import { CALL_DETAILS } from '../Redux/Action'
const initialState = {
    updateclientdetails: [],
    updateQuestions:[],
    updateRating:[],
    getPersonalInfo:[],
    updatePersonalInfo: [],
    academicdetails:[]
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
<<<<<<< HEAD
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
=======
            case CALL_DETAILS.academicdetails:
            return {
                ...state,
                academicdetails: action.payload
            }

>>>>>>> 95a5ce2336e87df8cd2982152c282946844b9e14
        default:
            break
    }
    return state
}

