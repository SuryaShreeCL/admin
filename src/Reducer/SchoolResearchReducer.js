import { SCHOOL_RESEARCH } from "../Redux/Action";
const initialState = {
  getNumberOfPreferences: null,
  getPreferenceListBasedOnPreferenceID: null,
  addRecommendation: null,
  getStageComplete: null,
};

const SchoolResearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHOOL_RESEARCH.getNumberOfPreferences:
      return {
        ...state,
        getNumberOfPreferences: action.payload,
      };
    case SCHOOL_RESEARCH.getPreferenceListBasedOnPreferenceID:
      return {
        ...state,
        getPreferenceListBasedOnPreferenceID: action.payload,
      };
    case SCHOOL_RESEARCH.addRecommendation:
      return {
        ...state,
        addRecommendation: action.payload,
      };
    case SCHOOL_RESEARCH.getStageComplete:
      return {
        ...state,
        getStageComplete: action.payload,
      };
    case SCHOOL_RESEARCH.getStageCalls:
      return {
        ...state,
        getStageCalls: action.payload,
      };
    case SCHOOL_RESEARCH.clearData:
      return {
        ...state,
        getStageComplete: null,
      };
    default:
      break;
  }
  return state;
};
export default SchoolResearchReducer;
