import { PGA } from "../Redux/Action";

const initialState = {
    pgaScoreDetails : [],
    careerInterestList : [],
    academicDataPostResponse : [],
    pgaAcademicDetails : [],
    choosenTrackForStudent : [],
    postGeneralDetailsResponse : [],
    cvandppgaResponse : [],
    getcvandppgaResponse :[],
    getppgaResponse : [],
    getcvResponse :[],
    enrollmentPeriod : [],
    quarterPlan : [],
    starterPackDetails : []
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
                        case PGA.postcvandppga:
                            return {
                                ...state,
                                cvandppgaResponse : action.payload
                            }
                        case PGA.getcvandppga:
                            return {
                             ...state,
                             getcvandppgaResponse : action.payload
                            }
                        case PGA.getppgaques:
                            return {
                                ...state,
                                getppgaResponse : action.payload
                             }
                         case PGA.getcvques:
                            return {
                              ...state,
                              getcvResponse : action.payload
                            }
                        case PGA.getAllEnrollmentPeriod:
                            return {
                                ...state,
                                enrollmentPeriod : action.payload
                            }
                            case PGA.getQuarterPlan:
                                return {
                                    ...state,
                                    quarterPlan : action.payload
                                }
                                case PGA.getAllStarterPack:
                                    return {
                                        ...state,
                                        starterPackDetails : action.payload
                                    }
        default:
            return state
    }
}