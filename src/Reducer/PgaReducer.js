import { PGA } from "../Redux/Action";

const initialState = {
    pgaScoreDetails : [],
    careerInterestList : [],
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case PGA.getScoreDetails:
                return {
                    ...state,
                    pgaScoreDetails : action.payload
                }
                case PGA.getCareerInterest:
                return {
                    ...state,
                    careerInterestList : action.payload
                }
        default:
            return state
    }
}