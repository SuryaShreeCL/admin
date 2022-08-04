import { PROFILE_FIT_SPIDER_GRAPH } from "../Redux/Action";

const initialState = {
  isLoading: false,
  spiderGraphQuestions: null,
  answerUpdateStatus: null,
  spiderDetails: null,
  graph: null,
  updateRemark: null,
  spiderGraph: null,
};

const ProfileFitSpiderGraphReducer = (state, action) => {
  switch (action.type) {
    case PROFILE_FIT_SPIDER_GRAPH.loader:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE_FIT_SPIDER_GRAPH.getSpiderGraphQuestions:
      return {
        ...state,
        spiderGraphQuestions: action.payload,
        isLoading: action.loading,
      };
    case PROFILE_FIT_SPIDER_GRAPH.putSpiderGraphAnswers:
      return {
        ...state,
        answerUpdateStatus: action.payload,
        isLoading: action.loading,
      };
    case PROFILE_FIT_SPIDER_GRAPH.getSpiderDetails:
      return {
        ...state,
        spiderDetails: action.payload,
        isLoading: action.loading,
      };
    case PROFILE_FIT_SPIDER_GRAPH.getSpiderGraph:
      return {
        ...state,
        graph: action.payload,
        isLoading: action.loading,
      };
    case PROFILE_FIT_SPIDER_GRAPH.updateRemark:
      return {
        ...state,
        updateRemark: action.payload,
        isLoading: action.loading,
      };

    case PROFILE_FIT_SPIDER_GRAPH.spiderGraph:
      return {
        ...state,
        spiderGraph: action.payload,
        isLoading: action.loading,
      };
    default:
      break;
  }
  return initialState;
};

export default ProfileFitSpiderGraphReducer;
