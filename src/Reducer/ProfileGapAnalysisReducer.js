import { PROFILE_GAP_ANALYSIS } from "../Redux/Action";

const initialState = {
  getgeneraldetails: [],
  getstatus: [],
  getcommenthistory: [],
  updatestatus: [],
  updategeneraldetails: [],
  ppgaCallNotes : [],
  ppgaCall : [],
  testResults : [],
  testResults : [],
  getcvresult:[],
  deletecvresult:[],
  updatecvresult:[],
  getdashboarddetails:[],
  getpgalist:[],
  academicView : [],
  semesterDetails : [],
  // download : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GAP_ANALYSIS.getgeneraldetails:
      return {
        ...state,
        getgeneraldetails: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getstatus:
      return {
        ...state,
        getstatus: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.getcommenthistory:
      return {
        ...state,
        getcommenthistory: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updatestatus:
      return {
        ...state,
        updatestatus: action.payload,
      };
    case PROFILE_GAP_ANALYSIS.updategeneraldetails:
      return {
        ...state,
        updategeneraldetails: action.payload,
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

        case PROFILE_GAP_ANALYSIS.updatePpgaCallNotes :
          return{
              ...state,
              ppgaCall:action.payload,
          }; 
          
        
        case PROFILE_GAP_ANALYSIS.getcvresult :
        return{
            ...state,
            getcvresult:action.payload,
        }; 
        case PROFILE_GAP_ANALYSIS.deletecvresult :
          return{
              ...state,
              deletecvresult:action.payload,
          }; 
          case PROFILE_GAP_ANALYSIS.updatecvresult :
            return{
                ...state,
                updatecvresult:action.payload,
            }; 
          case PROFILE_GAP_ANALYSIS.getdashboarddetails:
            return{
                ...state,
                getdashboarddetails:action.payload,
            }; 
            case PROFILE_GAP_ANALYSIS.getpgalist:
            return{
                ...state,
                getpgalist:action.payload,
            }; 
            case PROFILE_GAP_ANALYSIS.viewAcademicDetails:
              return{
                  ...state,
                  academicView:action.payload,
              }; 
              case PROFILE_GAP_ANALYSIS.viewSemesterDetails:
              return{
                  ...state,
                  semesterDetails:action.payload,
              }; 
              // case PROFILE_GAP_ANALYSIS.fileDownload:
              // return{
              //     ...state,
              //     download:action.payload,
              // }; 
    default:
      return state;
  }
  return state;
};
