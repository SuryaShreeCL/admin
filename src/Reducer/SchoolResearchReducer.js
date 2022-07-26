import { SCHOOL_RESEARCH } from "../Redux/Action";
const initialState = {
  getNumberOfPreferences: null,
  getPreferenceListBasedOnPreferenceID: null,
  addRecommendation: null,
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

    // case SCHOOL_RESEARCH.clearCustomData:
    //   return {
    //     ...state,
    //     [action.fieldName]: null,
    //   };
    default:
      break;
  }
  return state;
};
export default SchoolResearchReducer;
