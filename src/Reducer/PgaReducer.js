import { PGA } from "../Redux/Action";

const initialState = {
    pgaScoreDetails : [],
    careerInterestList : [],
    academicDataPostResponse : [],
    pgaAcademicDetails : [],
    choosenTrackForStudent : [],
    postGeneralDetailsResponse : [],

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
                        case PGA.postGenralDetails:
                        return {
                            ...state,
                            postGeneralDetailsResponse : action.payload
                        }
                        case PGA.getPgaCvAndPpga:
                        return {
                            ...state,
                            PgaCvAndPpga : action.payload
                        }
                        case PGA.getppgaques:
                            return {
                                ...state,
                                getppgaques : action.payload
                             }
                       
        default:
            return state
    }
}