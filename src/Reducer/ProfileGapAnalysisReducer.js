import {PROFILE_GAP_ANALYSIS} from  '../Redux/Action'

const initialState={
    getgeneraldetails : [],
    getstatus : [],
    getcommenthistory:[],
    updatestatus:[],
    ppgaCallNotes : [],
    testResults : []
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case PROFILE_GAP_ANALYSIS.getgeneraldetails :
            return{
                ...state,
                getgeneraldetails:action.payload,
            };   
            case PROFILE_GAP_ANALYSIS.getstatus :
                return{
                    ...state,
                    getstatus:action.payload,
                }; 
                case PROFILE_GAP_ANALYSIS.getcommenthistory :
                return{
                    ...state,
                    getcommenthistory:action.payload,
                };
                case PROFILE_GAP_ANALYSIS.updatestatus :
                return{
                    ...state,
                    updatestatus:action.payload,
                };   
                case PROFILE_GAP_ANALYSIS.getPpgaCallNotes :
                    return{
                        ...state,
                        ppgaCallNotes:action.payload,
                    };    
                    case PROFILE_GAP_ANALYSIS.getTestResults :
                    return{
                        ...state,
                        testResults:action.payload,
                    };                
        default:
            return state;            
    }
    return state;
}