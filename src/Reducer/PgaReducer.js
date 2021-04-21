import { PGA } from "../Redux/Action";

const initialState = {
    pgaScoreDetails : []
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case PGA.getScoreDetails:
                return {
                    ...state,
                    pgaScoreDetails : action.payload
                }
        default:
            return state
    }
}