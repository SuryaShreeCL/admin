import { PGA } from "../Redux/Action";

const initialState = {
    pgaScoreDetails : [],
    careerInterestList : [],
    academicDataPostResponse : [],
    pgaAcademicDetails : [],
    choosenTrackForStudent : [],

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
                case PGA.postAcademicData:
                return {
                    ...state,
                    academicDataPostResponse : action.payload
                }
                case PGA.getPgaAcademicData:
                    return {
                        ...state,
                        pgaAcademicDetails : action.payload
                    }
                    case PGA.getChoosenTrack:
                        return {
                            ...state,
                            choosenTrackForStudent : action.payload
                        }
        default:
            return state
    }
}