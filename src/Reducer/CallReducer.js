import { CALL_DETAILS } from "../Redux/Action";
const initialState = {
  updateclientdetails: [],
  updateQuestions: [],
  updateRating: [],
  getPersonalInfo: [],
  updatePersonalInfo: [],
  academicdetails: [],
  getworkexp: [],
  updateworkexp: [],
  getClientInfo: [],
  getAspirationDetails: [],
  getgmatscore: [],
  getgrescore: [],
  getieltsscore: [],
  gettoeflscore: [],
  updategrescore: [],
  updategmatscore: [],
  updatetoeflscore: [],
  updateieltsscore: [],
  downloadGAT : [],
  fileuploadGAT :[],
  completecall:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CALL_DETAILS.updateclientdetails:
      return {
        ...state,
        updateclientdetails: action.payload,
      };
    case CALL_DETAILS.updateQuestions:
      return {
        ...state,
        updateQuestions: action.payload,
      };
    case CALL_DETAILS.updateRating:
      return {
        ...state,
        updateRating: action.payload,
      };
    case CALL_DETAILS.getPersonalInfo:
      return {
        ...state,
        getPersonalInfo: action.payload,
      };
    case CALL_DETAILS.updatePersonalInfo:
      return {
        ...state,
        updatePersonalInfo: action.payload,
      };
    case CALL_DETAILS.academicdetails:
      return {
        ...state,
        academicdetails: action.payload,
      };
    case CALL_DETAILS.updateworkexp:
      return {
        ...state,
        updateworkexp: action.payload,
      };
    case CALL_DETAILS.getworkexp:
      return {
        ...state,
        getworkexp: action.payload,
      };
    case CALL_DETAILS.getClientInfo:
      return {
        ...state,
        getClientInfo: action.payload,
      };
    case CALL_DETAILS.getAspirationDetails:
      return {
        ...state,
        getAspirationDetails: action.payload,
      };
    case CALL_DETAILS.getgrescore:
      return {
        ...state,
        getgrescore: action.payload,
      };
    case CALL_DETAILS.getgmatscore:
      return {
        ...state,
        getgmatscore: action.payload,
      };
    case CALL_DETAILS.getieltsscore:
      return {
        ...state,
        getieltsscore: action.payload,
      };
    case CALL_DETAILS.gettoeflscore:
      return {
        ...state,
        gettoeflscore: action.payload,
      };
    case CALL_DETAILS.updategrescore:
      return {
        ...state,
        updategrescore: action.payload,
      };
    case CALL_DETAILS.updategmatscore:
      return {
        ...state,
        updategmatscore: action.payload,
      };
    case CALL_DETAILS.updatetoeflscore:
      return {
        ...state,
        updatetoeflscore: action.payload,
      };
    case CALL_DETAILS.updateieltsscore:
      return {
        ...state,
        updateieltsscore: action.payload,
      };
      case CALL_DETAILS.downloadGAT:
        return {
          ...state,
          downloadGAT: action.payload,
        };
        case CALL_DETAILS.fileuploadGAT:
          return {
            ...state,
            fileuploadGAT: action.payload,
          };
          case CALL_DETAILS.completecall:
          return {
            ...state,
            completecall: action.payload,
          };
          // case CALL_DETAILS.getsearchlist:
          //   return {
          //     ...state,
          //     getsearchlist: action.payload,
          //   };
    default:
      break;
  }
  return state;
};
